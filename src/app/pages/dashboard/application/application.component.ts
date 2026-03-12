import { Component, OnInit } from '@angular/core';
import { MessageDefault } from 'src/app/Data/common/messageDefault';
import { createApplicationRequest } from 'src/app/Data/dto/user/request/createApplicationRequest';
import { ApplicationItemResponse } from 'src/app/Data/dto/user/response/getApplicationResponse';
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

    // ── Eliminar ─────────────────────────────────────────────────
    deleteApplication(id: number): void {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará la aplicación permanentemente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#14b8a6',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
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
}
