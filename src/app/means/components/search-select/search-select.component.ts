import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, HostListener, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { getAuthHeaders } from 'src/app/Data/common/getAuthHeaders';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchSelectComponent),
      multi: true
    }
  ],
  standalone: false
})
export class SearchSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() endpoint!: string; // e.g. 'Domain'
  @Input() searchParam: string = 'search';
  @Input() resultPath: string = 'data.domains'; // Path to extract array from response
  @Input() displayField: string = 'name'; // Prop to show in list and input
  @Input() valueField: string = 'id'; // Prop to bind to ngModel
  @Input() subtextField: string = ''; // Sub prop (e.g. principalEmail)
  @Input() imageField: string = ''; // Avatar prop
  @Input() placeholder: string = 'Buscar...';
  
  @Output() itemSelected = new EventEmitter<any>();

  searchTerm: string = '';
  items: any[] = [];
  isLoading: boolean = false;
  showDropdown: boolean = false;
  selectedItem: any = null;
  value: any = null; // Internal value for ngModel

  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  // CVA methods
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private cookieService: CookieService, private eRef: ElementRef) {}

  ngOnInit() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe((term) => {
      this.fetchData(term);
    });
    // Fetch initial data so it's ready when user opens it
    this.fetchData('');
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
  }

  // --- CVA Implementation ---
  writeValue(obj: any): void {
    this.value = obj;
    if (!obj) {
      this.selectedItem = null;
      this.searchTerm = '';
      return;
    }

    // Attempt to find the item in current list
    const found = this.items.find(i => i[this.valueField] === obj);
    if (found) {
      this.selectedItem = found;
      this.searchTerm = found[this.displayField];
    } else {
      // If not in list, show the value itself (especially useful if valueField == displayField)
      this.searchTerm = obj;
    }
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState?(isDisabled: boolean): void {}

  // --- Interaction Methods ---
  onFocus() {
    this.showDropdown = true;
    if (this.items.length === 0 && !this.isLoading) {
      this.isLoading = true;
      this.fetchData(this.searchTerm);
    }
  }

  onInput(event: any) {
    const term = event.target.value;
    this.searchTerm = term;
    
    if (this.selectedItem) {
        this.clearSelection(false);
        this.searchTerm = term;
    }

    this.isLoading = true;
    this.showDropdown = true;
    this.searchSubject.next(term);
  }

  async fetchData(term: string) {
    let url = `${environment.url}${this.endpoint}?page=1&size=10`;
    if (term.trim()) {
        url += `&${this.searchParam}=${encodeURIComponent(term)}`;
    }
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(this.cookieService)
      });
      const resData = await response.json();
      
      let arrayData = resData;
      if (this.resultPath) {
          const pathParts = this.resultPath.split('.');
          for (const part of pathParts) {
             if (arrayData && arrayData[part] !== undefined) {
                arrayData = arrayData[part];
             } else {
                arrayData = [];
                break;
             }
          }
      }
      this.items = Array.isArray(arrayData) ? arrayData : [];

      // Sync selection if items were just loaded and we have a pending value
      if (this.value && (!this.selectedItem || this.selectedItem[this.valueField] !== this.value)) {
        const found = this.items.find(i => i[this.valueField] === this.value);
        if (found) {
          this.selectedItem = found;
          this.searchTerm = found[this.displayField];
        }
      }
    } catch (e) {
      console.error('Error fetching data for search-select', e);
      this.items = [];
    } finally {
      this.isLoading = false;
    }
  }

  selectItem(item: any) {
    this.selectedItem = item;
    // Bind search input to the selected item's text
    this.searchTerm = item[this.displayField] || '';
    this.showDropdown = false;
    
    let val = item[this.valueField];
    if (val === undefined) {
      val = item.id !== undefined ? item.id : (item.Id !== undefined ? item.Id : item.code);
    }
    
    this.value = val;
    this.onChange(this.value);
    this.itemSelected.emit(item);
  }

  clearSelection(clearText: boolean = true) {
    this.selectedItem = null;
    if (clearText) {
        this.searchTerm = '';
    }
    this.value = null;
    this.onChange(null);
    this.itemSelected.emit(null);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }

  getInitial(item: any): string {
    const text = item[this.displayField] || '';
    return text.substring(0, 2).toUpperCase();
  }
}
