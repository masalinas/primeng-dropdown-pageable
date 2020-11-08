import { Component, Input, Output, EventEmitter, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    host: {
        '(document:click)': 'onClick($event)',
    },
    selector: 'selector',
    templateUrl: './selector.component.html',
    styleUrls: ['./selector.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Selector),
            multi: true
        }
    ]
})
export class Selector implements ControlValueAccessor {
    public _show: boolean;    
    
    public _filterData: any;

    public _rowsPerPageOption: number = 5;
    public _totalPages: number = 1;
    public _totalRecords: number;
    public _activePage: number = 1;    

    public _selectedValue: any;
    public _selectedItem: any;

    @Input('value') _value: any;
    onChange: any = () => {};
    onTouched: any = () => {};

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this._selectedValue = val[this.optionLabel];
        this._selectedItem = val;

        this.onChange(val);
        this.onTouched();
    }

    public _options: any[];
    
    @Input() get options(): any[] {
        return this._options;
    }

    set options(val: any[]) {
        this._options = val;

        this._totalPages = Math.trunc(this._totalRecords / this._rowsPerPageOption);

        if (this._totalRecords % this._rowsPerPageOption > 0)
            this._totalPages = this._totalPages + 1;
    }

    @Input() get rowsPerPageOption(): number {
        return this._rowsPerPageOption;
    }

    set rowsPerPageOption(val: number) {
        this._rowsPerPageOption = val;
    }

    @Input() get totalRecords(): number {
        return this._totalRecords;
    }

    set totalRecords(val: number) {
        this._totalRecords = val;
    }

    @Input() placeholder: string;

    @Input() optionLabel: string;

    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();
    
    constructor(private _eref: ElementRef) {}

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }
    
    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    writeValue(value) {
        if (value) {
          this.value = value;
        }
    }

    onClick(event) {
        if (!this._eref.nativeElement.contains(event.target))
            this._show = false;
    }

    onSelectClick(event) {
        this._selectedValue = event.value[this.optionLabel];
        this._show = false;

        this.value = this._selectedItem;        

        this.onSelect.emit({
            originalEvent: event,
            selected: this._value
        });        
    }

    onChangeFilter(event) {
        this._filterData = event;

        this.onLazyLoad.emit({
            originalEvent: event,
            activePage: this._activePage,
            filterData: this._filterData
        }); 
    }

    onPreviousPage(event) {
        if (this._activePage == 1)
            return;

        this._activePage = this._activePage - 1;

        this.onLazyLoad.emit({
            originalEvent: event,
            activePage: this._activePage,
            filterData: this._filterData
        }); 
    }

    onNextPage(event) {
        if (this._activePage == this._totalPages)
            return;

        this._activePage = this._activePage + 1;

        this.onLazyLoad.emit({
            originalEvent: event,
            activePage: this._activePage,
            filterData: this._filterData
        }); 
    }
}
