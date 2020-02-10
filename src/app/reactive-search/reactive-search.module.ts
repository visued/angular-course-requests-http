import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveSearchRoutingModule } from './reactive-search-routing.module';
import { ReactiveSearchComponent } from './reactive-search.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReactiveSearchComponent],
  imports: [
    CommonModule,
    ReactiveSearchRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReactiveSearchModule { }
