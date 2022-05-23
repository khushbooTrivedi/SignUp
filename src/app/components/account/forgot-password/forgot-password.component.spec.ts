import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/shared/shared.module';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, SharedModule],
      declarations: [ForgotPasswordComponent],
      providers: [FormBuilder, HttpClient],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate filled form', () => {
    component.forgotPasswordForm.setValue({
      email: 'test@abc.com',
    });
    expect(component.forgotPasswordForm.valid).toBeTruthy();
  });

  it('should check empty form', () => {
    component.forgotPasswordForm.setValue({
      email: '',
    });
    expect(component.forgotPasswordForm.valid).toEqual(false);
  });

  it('email field validity', () => {
    let control = component.forgotPasswordForm.controls['email'];
    expect(control.valid).toBeFalsy();
    let errors = {};
    control.setValue('');
    errors = control.errors || {};
    expect(errors['required']).toBeTruthy();
    control.setValue('a');
    expect(control.errors['pattern']).toBeTruthy();
  });
});
