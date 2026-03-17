import { Component, OnInit } from '@angular/core';
import { MessageDefault } from 'src/app/Data/common/messageDefault';
import { createApplicationRequest } from 'src/app/Data/dto/user/request/createApplicationRequest';
import { ApplicationItemResponse } from 'src/app/Data/dto/user/response/getApplicationResponse';
import { NegocioItemResponse } from 'src/app/Data/dto/negocio/response/getNegocioResponse';
import { applicationServices } from 'src/app/Data/services/applicationServices';
import { TableColumn, TableAction } from 'src/app/means/components/table/table.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss'],
    standalone: false
})
export class ApplicationComponent implements OnInit {

    // ── Estado general ──────────────────────────────────────────
    applications: ApplicationItemResponse[] = [];
    isLoading: boolean = false;

    // ── Table config ────────────────────────────────────────────
    tableColumns: TableColumn[] = [
        { key: 'name', header: 'Aplicación', type: 'user' },
        { key: 'description', header: 'Descripción', type: 'text' },
        { key: 'code', header: 'Código UUID', type: 'text' }
    ];

    tableActions: TableAction[] = [
        { id: 'assign', icon: 'fas fa-briefcase', class: 'text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-lg', title: 'Asignar Negocio' },
        { id: 'copy', icon: 'fas fa-copy', class: 'text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-lg', title: 'Copiar código' },
        { id: 'edit', icon: 'fas fa-pen', class: 'text-teal-600 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 p-2 rounded-lg', title: 'Editar' },
        { id: 'delete', icon: 'fas fa-trash', class: 'text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg', title: 'Eliminar' }
    ];

    // ── Modal Crear ──────────────────────────────────────────────
    showCreateModal: boolean = false;
    isCreating: boolean = false;
    newApp: createApplicationRequest = new createApplicationRequest();

    // ── Modal Editar ──────────────────────────────────────────────
    showEditModal: boolean = false;
    isUpdating: boolean = false;
    editApp: createApplicationRequest = new createApplicationRequest();
    editAppId: number = 0;

    selectedApplications: number[] = [];

    // ── Modal Asignar Negocio ─────────────────────────────────────
    showAssignModal: boolean = false;
    isAssigning: boolean = false;
    assignAppId: number = 0;
    selectedCompanyId: number | string | null = null;
    assignedNegocios: NegocioItemResponse[] = [];

    constructor(private appService: applicationServices) { }

    ngOnInit(): void {
        this.loadApplications();
    }

    // ── Carga ────────────────────────────────────────────────────
    loadApplications(): void {
        this.isLoading = true;
        this.appService.get$()
            .then(res => {
                if (res.success && res.data && res.data.applications) {
                    this.applications = [...res.data.applications]; // triggers change detection
                }
            })
            .catch(() => this.showError())
            .finally(() => this.isLoading = false);
    }

    // ── Acciones de Tabla ─────────────────────────────────────────
    onTableAction(event: { actionId: string, item: any }): void {
        const app = event.item as ApplicationItemResponse;
        switch (event.actionId) {
            case 'assign':
                this.openAssign(app);
                break;
            case 'copy':
                this.copyCode(app);
                break;
            case 'edit':
                this.openEdit(app);
                break;
            case 'delete':
                this.deleteApplication(app.id);
                break;
        }
    }

    // ── Crear ────────────────────────────────────────────────────
    openCreate(): void {
        this.newApp = new createApplicationRequest();
        this.showCreateModal = true;
    }

    closeCreate(): void {
        this.showCreateModal = false;
    }

    createApplication(): void {
        if (!this.newApp.name?.trim()) return;
        this.isCreating = true;
        this.appService.create$(this.newApp)
            .then(res => {
                if (res.success && res.data) {
                    const added: ApplicationItemResponse = {
                        id: res.data.id,
                        code: res.data.code,
                        name: this.newApp.name,
                        description: this.newApp.description,
                        avatar: this.newApp.avatar ?? '',
                        isDeleted: false,
                        registrationDate: new Date().toISOString()
                    };
                    // Update array tracking for table component onChanges
                    this.applications = [...this.applications, added];
                    this.showCreateModal = false;
                    this.showSuccess('Aplicación creada correctamente.');
                } else {
                    this.showWarning(res.message);
                }
            })
            .catch(() => this.showError())
            .finally(() => this.isCreating = false);
    }

    // ── Editar ───────────────────────────────────────────────────
    openEdit(app: ApplicationItemResponse): void {
        this.editAppId = app.id;
        this.editApp = {
            name: app.name,
            description: app.description,
            avatar: app.avatar
        };
        this.showEditModal = true;
    }

    closeEdit(): void {
        this.showEditModal = false;
    }

    updateApplication(): void {
        if (!this.editApp.name?.trim()) return;
        this.isUpdating = true;
        this.appService.update$(this.editAppId, this.editApp)
            .then(res => {
                if (res.success) {
                    const idx = this.applications.findIndex(a => a.id === this.editAppId);
                    if (idx !== -1) {
                        const updated = [...this.applications];
                        updated[idx] = {
                            ...updated[idx],
                            name: this.editApp.name,
                            description: this.editApp.description,
                            avatar: this.editApp.avatar
                        };
                        this.applications = updated;
                    }
                    this.showEditModal = false;
                    this.showSuccess('Aplicación actualizada correctamente.');
                } else {
                    this.showWarning(res.message);
                }
            })
            .catch(() => this.showError())
            .finally(() => this.isUpdating = false);
    }

    // ── Asignar Negocio ──────────────────────────────────────────
    openAssign(app: ApplicationItemResponse): void {
        this.assignAppId = app.id;
        this.selectedCompanyId = null;
        this.assignedNegocios = [];
        this.showAssignModal = true;

        this.appService.getAssignedCompanies$(app.id)
            .then(res => {
                if (res.success && res.data) {
                    const raw = Array.isArray(res.data) ? res.data : (res.data.companies || []);
                    this.assignedNegocios = raw.map((n: any) => ({ ...n, id: n.id ?? n.Id ?? n.companyId }));
                }
            })
            .catch(() => this.showError());
    }

    closeAssign(): void {
        this.showAssignModal = false;
    }

    // Gestionar la selección del search-select
    onNegocioSelected(negocio: any): void {
        if (!negocio) return;

        // Normalizar id: el backend puede devolver 'Id' (Pascal) o 'id' (camel)
        const negocioId: number = negocio.id ?? negocio.Id ?? negocio.companyId;

        if (!negocioId) {
            this.showError();
            return;
        }

        if (this.assignedNegocios.find(n => n.id === negocioId)) {
            Swal.fire({ icon: 'info', text: 'Este negocio ya está asignado.' });
            this.selectedCompanyId = null;
            return;
        }

        this.isAssigning = true;
        this.appService.assignCompany$(this.assignAppId, negocioId)
            .then(res => {
                if (res.success) {
                    this.assignedNegocios.push({ ...negocio, id: negocioId });
                    this.showSuccess('Negocio asignado correctamente.');
                    this.selectedCompanyId = null;
                } else {
                    this.showWarning(res.message);
                }
            })
            .catch(() => this.showError())
            .finally(() => this.isAssigning = false);
    }

    removeAssignment(negocioId: number): void {
        Swal.fire({
            title: '¿Remover asignación?',
            text: 'El negocio dejará de estar vinculado a esta aplicación.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, remover',
            cancelButtonText: 'Cancelar',
            heightAuto: false,
            buttonsStyling: false,
            customClass: {
                confirmButton: 'px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-xl shadow-sm mx-2 transition-all',
                cancelButton: 'px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl shadow-sm mx-2 transition-all'
            }
        }).then(result => {
            if (result.isConfirmed) {
                this.appService.unassignCompany$(this.assignAppId, negocioId)
                    .then(res => {
                        if (res.success) {
                            this.assignedNegocios = this.assignedNegocios.filter(n => n.id !== negocioId);
                            this.showSuccess('Asignación removida.');
                        } else {
                            this.showWarning(res.message);
                        }
                    })
                    .catch(() => this.showError());
            }
        });
    }

    // ── Eliminar ─────────────────────────────────────────────────
    deleteApplication(id: number): void {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará la aplicación permanentemente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-xl shadow-sm mx-2 transition-all',
                cancelButton: 'px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl shadow-sm mx-2 transition-all'
            }
        }).then(result => {
            if (result.isConfirmed) {
                this.appService.deleted$(id)
                    .then(res => {
                        if (res.success) {
                            this.applications = this.applications.filter(a => a.id !== id);
                            this.showSuccess('Aplicación eliminada.');
                        } else {
                            this.showWarning(res.message);
                        }
                    })
                    .catch(() => this.showError());
            }
        });
    }

    // ── Copiar código ─────────────────────────────────────────────
    copyCode(app: ApplicationItemResponse): void {
        navigator.clipboard.writeText(app.code).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Copiado',
                text: 'Código UUID copiado al portapapeles',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
            });
        });
    }

    // ── Helpers SweetAlert ────────────────────────────────────────
    private showSuccess(text: string): void {
        Swal.fire({ icon: 'success', title: 'Éxito', text, timer: 2000, showConfirmButton: false });
    }

    private showWarning(text: string): void {
        Swal.fire({ icon: 'warning', title: 'Atención', text });
    }

    private showError(): void {
        Swal.fire({ icon: 'error', title: 'Error', text: MessageDefault.errorConexion });
    }

    handleSelectionChange(selected: any[]): void {
        this.selectedApplications = selected.map(item => item.id);
    }

    deleteSelectedApplications(): void {
        if (this.selectedApplications.length === 0) return;
        Swal.fire({
            title: `¿Eliminar ${this.selectedApplications.length} aplicación(es)?`,
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-xl shadow-sm mx-2 transition-all',
                cancelButton: 'px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl shadow-sm mx-2 transition-all'
            }
        }).then(result => {
            if (!result.isConfirmed) return;
            const ids = [...this.selectedApplications];
            Promise.all(ids.map(id => this.appService.deleted$(id)))
                .then(results => {
                    const failed = results.filter(r => !r.success).length;
                    this.applications = this.applications.filter(a => !ids.includes(a.id));
                    this.selectedApplications = [];
                    if (failed > 0) {
                        this.showWarning(`${failed} aplicación(es) no pudieron eliminarse.`);
                    } else {
                        this.showSuccess(`${ids.length} aplicación(es) eliminada(s) correctamente.`);
                    }
                })
                .catch(() => this.showError());
        });
    }
}
