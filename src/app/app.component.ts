import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public rowsPerPageOption: number = 3;
  public optionLabel: string = "name";

  public userFormGroup = this.fb.group({
    id: [],
    firstName: [''],
    lastName: [''],
    city: ['']
  });

  public cities: any[] = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Spain', code: 'ES'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Berlin', code: 'GE'},
    {name: 'Paris', code: 'PRS'}
  ];
  public data: any[];

  public user: any;

  paginator(items, current_page, per_page_items) {
    let page = current_page || 1,
    per_page = per_page_items || 10,
    offset = (page - 1) * per_page,
  
    paginatedItems = items.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(items.length / per_page);
  
    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: (total_pages > page) ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      data: paginatedItems
    };
  }

  constructor(private fb: FormBuilder) {    
    this.onLazyLoad({activePage: 1});

    this.userFormGroup.reset({id: 1, 
                              firstName: 'Miguel', 
                              lastName:  'Salinas Gancedo',
                              city: {name: 'Spain', code: 'ES'}});
  }

  onSelect(event) {
    console.log(event.selected);
  }

  onLazyLoad(event) {
    if (event.filterData) {
      this.data = this.cities.filter(item => item[this.optionLabel].includes(event.filterData));

      this.data = this.paginator(this.data, event.activePage, this.rowsPerPageOption).data;     
    }
    else
      this.data = this.paginator(this.cities, event.activePage, this.rowsPerPageOption).data;     
  }

  onSubmit(value) {
    this.user = value;
  }
}
