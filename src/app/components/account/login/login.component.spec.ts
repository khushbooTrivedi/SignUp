import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from 'src/app/services/account.service';
import { ValidationService } from 'src/app/services/validation.service';
import { SharedModule } from 'src/shared/shared.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, SharedModule],
      declarations: [LoginComponent],
      providers: [AccountService, ValidationService, FormBuilder, HttpClient],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid email', () => {
    component.loginForm.setValue({
      email: 'invalidemail',
      password: '',
    });
    expect(component.loginForm.valid).toEqual(false);
  });

  it('should require password', () => {
    component.loginForm.setValue({
      email: '',
      password: 'password',
    });
    expect(component.loginForm.valid).toEqual(false);
  });

  it('should validate email', () => {
    component.loginForm.setValue({
      email: 'test@a',
      password: 'password',
    });
    expect(component.loginForm.valid).toEqual(false);
  });

  it('should validate email ', () => {
    component.loginForm.setValue({
      email: 'test@abc.com',
      password: 'password',
    });
    expect(component.loginForm.valid).toEqual(true);
  });
});
