import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

export interface TableColumn {
    key: string;
    header: string;
    type?: 'text' | 'badge' | 'date' | 'actions' | 'custom' | 'user';
    sortable?: boolean;
    class?: string;
    badgeConfig?: (value: any) => string;
}

export interface TableAction {
    id: string;
    label?: string;
    icon: string;
    class: string;
    title?: string;
}

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    standalone: false
})
export class TableComponent implements OnInit, OnChanges {
    @Input() data: any[] = [];
    @Input() columns: TableColumn[] = [];
    @Input() actions: TableAction[] = [];
    @Input() selectable: boolean = true;
    @Input() itemsPerPage: number = 5;
    @Input() searchPlaceholder: string = 'Buscar...';
    @Input() searchFields: string[] = [];

    @Output() actionClick = new EventEmitter<{ actionId: string, item: any }>();
    @Output() selectionChange = new EventEmitter<any[]>();

    filteredData: any[] = [];
    selectedItems: any[] = [];
    currentPage: number = 1;
    totalPages: number = 0;
    searchTerm: string = '';

    ngOnInit(): void {
        this.applyFilters();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            this.applyFilters();
        }
    }

    applyFilters(): void {
        if (!this.data) return;

        this.filteredData = this.data.filter(item => {
            if (!this.searchTerm) return true;

            const search = this.searchTerm.toLowerCase();
            return this.searchFields.some(field => {
                const value = this.getValue(item, field);
                return value ? String(value).toLowerCase().includes(search) : false;
            });
        });

        this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        if (this.currentPage > this.totalPages && this.totalPages > 0) {
            this.currentPage = this.totalPages;
        } else if (this.totalPages === 0) {
            this.currentPage = 1;
        }
    }

    getPaginatedData(): any[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
    }

    getValue(item: any, key: string): any {
        if (key.includes('.')) {
            return key.split('.').reduce((obj, k) => obj ? obj[k] : null, item);
        }
        return item[key];
    }

    onSearchChange(): void {
        this.currentPage = 1;
        this.applyFilters();
    }

    toggleSelection(item: any): void {
        const index = this.selectedItems.findIndex(i => i.id === item.id);
        if (index > -1) {
            this.selectedItems.splice(index, 1);
        } else {
            this.selectedItems.push(item);
        }
        this.selectionChange.emit(this.selectedItems);
    }

    toggleSelectAll(): void {
        const currentBatch = this.getPaginatedData();
        const allSelected = currentBatch.every(item => this.isItemSelected(item));

        if (allSelected) {
            currentBatch.forEach(item => {
                const index = this.selectedItems.findIndex(i => i.id === item.id);
                if (index > -1) this.selectedItems.splice(index, 1);
            });
        } else {
            currentBatch.forEach(item => {
                if (!this.isItemSelected(item)) this.selectedItems.push(item);
            });
        }
        this.selectionChange.emit(this.selectedItems);
    }

    isItemSelected(item: any): boolean {
        return this.selectedItems.some(i => i.id === item.id);
    }

    areAllSelected(): boolean {
        const currentBatch = this.getPaginatedData();
        return currentBatch.length > 0 && currentBatch.every(item => this.isItemSelected(item));
    }

    changePage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    getPageNumbers(): number[] {
        const pages = [];
        for (let i = 1; i <= this.totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }

    getDisplayFrom(current: number, perPage: number): number {
        return (current - 1) * perPage + 1;
    }

    getDisplayTo(current: number, perPage: number, total: number): number {
        return Math.min(current * perPage, total);
    }

    onAction(actionId: string, item: any): void {
        this.actionClick.emit({ actionId, item });
    }
}
