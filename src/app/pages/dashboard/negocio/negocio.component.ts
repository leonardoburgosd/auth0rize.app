import { Component, OnInit } from '@angular/core';
import { MessageDefault } from 'src/app/Data/common/messageDefault';
import { createNegocioRequest } from 'src/app/Data/dto/negocio/request/createNegocioRequest';
import { NegocioItemResponse } from 'src/app/Data/dto/negocio/response/getNegocioResponse';
import { negocioServices } from 'src/app/Data/services/negocioServices';
import { TableColumn, TableAction } from 'src/app/means/components/table/table.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-negocio',
    templateUrl: './negocio.component.html',
    styleUrls: ['./negocio.component.scss'],
    standalone: false
})
export class NegocioComponent implements OnInit {

    negocios: NegocioItemResponse[] = [];
    isLoading: boolean = false;

    tableColumns: TableColumn[] = [
        { key: 'name', header: 'Negocio', type: 'user' },
        { key: 'domainCode', header: 'Dominio', type: 'text' },
        { key: 'registrationDate', header: 'Fecha de Registro', type: 'text' }
    ];

    tableActions: TableAction[] = [
        { id: 'edit', icon: 'fas fa-pen', class: 'text-teal-600 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 p-2 rounded-lg', title: 'Editar' },
        { id: 'delete', icon: 'fas fa-trash', class: 'text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg', title: 'Eliminar' }
    ];

    showCreateModal: boolean = false;
    isCreating: boolean = false;
    newNegocio: createNegocioRequest = new createNegocioRequest();

    showEditModal: boolean = false;
    isUpdating: boolean = false;
    editNegocio: createNegocioRequest = new createNegocioRequest();
    editNegocioId: number = 0;

    selectedNegocios: number[] = [];

    constructor(private negocioService: negocioServices) { }

    ngOnInit(): void {
        this.loadNegocios();
    }

    loadNegocios(search?: string, domainId?: number, page: number = 1, size: number = 10): void {
        this.isLoading = true;
        this.negocioService.get$(search, domainId, page, size)
            .then(res => {
                if (res.success && res.data) {
                    if (res.data.companies) {
                        this.negocios = [...res.data.companies];
                    }
                }
            })
            .catch(() => this.showError())
            .finally(() => this.isLoading = false);
    }

    onTableAction(event: { actionId: string, item: any }): void {
        const item = event.item as NegocioItemResponse;
        switch (event.actionId) {
            case 'edit':
                this.openEdit(item);
                break;
            case 'delete':
                this.deleteNegocio(item.id);
                break;
        }
    }

    openCreate(): void {
        this.newNegocio = new createNegocioRequest();
        this.showCreateModal = true;
    }

    closeCreate(): void {
        this.showCreateModal = false;
    }

    createNegocio(): void {
        if (!this.newNegocio.name?.trim() || !this.newNegocio.domainId) return;
        this.isCreating = true;
        this.negocioService.create$(this.newNegocio)
            .then(res => {
                if (res.success) {
                    this.showCreateModal = false;
                    this.showSuccess('Negocio creado correctamente.');
                    this.loadNegocios();
                } else {
                    this.showWarning(res.message);
                }
            })
            .catch(() => this.showError())
            .finally(() => this.isCreating = false);
    }

    openEdit(item: NegocioItemResponse): void {
        this.editNegocioId = item.id;
        this.editNegocio = {
            name: item.name,
            domainId: item.domainCode != null ? item.domainCode : '',
            avatar: item.avatar
        };
        this.showEditModal = true;
    }

    closeEdit(): void {
        this.showEditModal = false;
    }

    updateNegocio(): void {
        if (!this.editNegocio.name?.trim() || !this.editNegocio.domainId) return;
        this.isUpdating = true;
        this.negocioService.update$(this.editNegocioId, this.editNegocio)
            .then(res => {
                if (res.success) {
                    const idx = this.negocios.findIndex(a => a.id === this.editNegocioId);
                    if (idx !== -1) {
                        const updated = [...this.negocios];
                        updated[idx] = {
                            ...updated[idx],
                            name: this.editNegocio.name,
                            domainCode: this.editNegocio.domainId!,
                            avatar: this.editNegocio.avatar
                        };
                        this.negocios = updated;
                    }
                    this.showEditModal = false;
                    this.showSuccess('Negocio actualizado correctamente.');
                } else {
                    this.showWarning(res.message);
                }
            })
            .catch(() => this.showError())
            .finally(() => this.isUpdating = false);
    }

    deleteNegocio(id: number): void {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el negocio permanentemente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#14b8a6',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then(result => {
            if (result.isConfirmed) {
                this.negocioService.deleted$(id)
                    .then(res => {
                        if (res.success) {
                            this.negocios = this.negocios.filter(a => a.id !== id);
                            this.showSuccess('Negocio eliminado.');
                        } else {
                            this.showWarning(res.message);
                        }
                    })
                    .catch(() => this.showError());
            }
        });
    }

    handleSelectionChange(selected: any[]): void {
        this.selectedNegocios = selected.map(item => item.id);
    }

    deleteSelectedNegocios(): void {
        if (this.selectedNegocios.length === 0) return;
        Swal.fire({
            title: `¿Eliminar ${this.selectedNegocios.length} negocio(s)?`,
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
            const ids = [...this.selectedNegocios];
            Promise.all(ids.map(id => this.negocioService.deleted$(id)))
                .then(results => {
                    const failed = results.filter(r => !r.success).length;
                    this.negocios = this.negocios.filter(n => !ids.includes(n.id));
                    this.selectedNegocios = [];
                    if (failed > 0) {
                        this.showWarning(`${failed} negocio(s) no pudieron eliminarse.`);
                    } else {
                        this.showSuccess(`${ids.length} negocio(s) eliminado(s) correctamente.`);
                    }
                })
                .catch(() => this.showError());
        });
    }

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
