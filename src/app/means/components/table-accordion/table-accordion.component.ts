import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ContentChild, TemplateRef } from '@angular/core';

export interface TableAccordionColumn {
  key: string;
  header: string;
  type?: 'text' | 'badge' | 'user' | 'custom';
  class?: string;
  badgeConfig?: (value: any) => string;
}

export interface TableAccordionAction {
  id: string;
  icon: string;
  class: string;
  title?: string;
}

@Component({
  selector: 'app-table-accordion',
  templateUrl: './table-accordion.component.html',
  standalone: false
})
export class TableAccordionComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() columns: TableAccordionColumn[] = [];
  @Input() actions: TableAccordionAction[] = [];
  @Input() itemsPerPage: number = 10;
  @Input() searchPlaceholder: string = 'Buscar...';
  @Input() searchFields: string[] = [];
  @Input() idKey: string = 'id';
  
  // Template para el contenido expandido
  @Input() expandedTemplate?: TemplateRef<any>;

  @Output() actionClick = new EventEmitter<{ actionId: string, item: any }>();

  filteredData: any[] = [];
  expandedIds: Set<any> = new Set();
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
    if (!key) return null;
    if (key.includes('.')) {
      return key.split('.').reduce((obj, k) => obj ? obj[k] : null, item);
    }
    return item[key];
  }

  toggleExpansion(item: any): void {
    const id = item[this.idKey];
    if (this.expandedIds.has(id)) {
      this.expandedIds.delete(id);
    } else {
      this.expandedIds.add(id);
    }
  }

  isExpanded(item: any): boolean {
    return this.expandedIds.has(item[this.idKey]);
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilters();
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

  onAction(actionId: string, item: any): void {
    this.actionClick.emit({ actionId, item });
  }

  Math = Math;
}
