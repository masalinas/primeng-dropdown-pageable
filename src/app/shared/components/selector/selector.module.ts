import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';

import { Selector } from './selector.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ListboxModule,
    ButtonModule,
    InputTextModule,    
    MenuModule,
  ],
  declarations: [
    Selector
  ],
  providers: [],
  exports: [Selector]
})
export class SelectorModule { }
