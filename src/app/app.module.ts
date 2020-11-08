import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { SelectorModule } from './shared/components/selector/selector.module';
import { DropdownPageableModule } from './shared/components/dropdown-pageable/dropdown-pageable';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,   
    FormsModule, 
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectorModule,
    DropdownPageableModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
