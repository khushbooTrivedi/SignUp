import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../app/components/alert/alert.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AlertComponent],
  providers: [],
  exports: [AlertComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
