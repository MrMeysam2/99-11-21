import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {MatSelectModule} from '@angular/material/select'; 
@NgModule({
  declarations: [],
  exports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
