import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
import { SignUpComponent } from './sign-up.component';
import { fakeBackendProvider } from 'src/helper/fake-backend';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/shared/shared.module';
import { ValidationService } from 'src/app/services/validation.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let validationService: ValidationService;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        SharedModule,
      ],
      declarations: [SignUpComponent],
      providers: [FormBuilder, fakeBackendProvider],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    validationService = TestBed.get(ValidationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate filled form', () => {
    component.signInForm.setValue({
      firstName: 'testfirstName,',
      lastName: 'testlastName',
      email: 'test@abc.com',
      password: 'testPassword',
      confirmPassword: 'testpassword',
    });
    expect(component.signInForm.valid).toBeTruthy();
  });

  it('should check empty form', () => {
    component.signInForm.setValue({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    expect(component.signInForm.valid).toEqual(false);
  });

  it('firstname field validity', () => {
    let name = component.signInForm.controls['firstName'];
    expect(name.valid).toBeFalsy();
    let errors = {};
    name.setValue('');
    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();
    name.setValue('a');
    expect(name.errors['minlength']).toBeTruthy();
    name.setValue('testtestFirstNametest');
    expect(name.errors['maxlength']).toBeTruthy();
  });

  it('lastname field validity', () => {
    let name = component.signInForm.controls['lastName'];
    expect(name.valid).toBeFalsy();
    let errors = {};
    name.setValue('');
    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();
    name.setValue('a');
    expect(name.errors['minlength']).toBeTruthy();
    name.setValue('testtestFirstNametest');
    expect(name.errors['maxlength']).toBeTruthy();
  });

  it('email field validity', () => {
    let control = component.signInForm.controls['email'];
    expect(control.valid).toBeFalsy();
    let errors = {};
    control.setValue('');
    errors = control.errors || {};
    expect(errors['required']).toBeTruthy();
    control.setValue('a');
    expect(control.errors['pattern']).toBeTruthy();
  });

  it('password field validity', () => {
    let control = component.signInForm.controls['password'];
    expect(control.valid).toBeFalsy();
    let errors = {};
    control.setValue('');
    errors = control.errors || {};
    expect(errors['required']).toBeTruthy();
    control.setValue('abc');
    expect(control.errors['minlength']).toBeTruthy();
    control.setValue('a@');
    expect(control.errors['pattern']).toBeTruthy();
  });

  it('confirmPassword field validity', () => {
    let control = component.signInForm.controls['confirmPassword'];
    expect(control.valid).toBeFalsy();
    let errors = {};
    control.setValue('');
    errors = control.errors || {};
    expect(errors['required']).toBeTruthy();
  });
});
