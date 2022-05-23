import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';
import { AlertType, Constants } from 'src/shared/utility';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  validationMessages = {};
  sendEmail = false;
  alertType = '';
  alertMessage = '';
  isAlert = false;
  @ViewChild('alert') alert: AlertComponent;

  formErrors = {
    email: { message: '', className: '' },
  };

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(Constants.EMAIL_REGEX_PATTERN),
        ],
      ],
    });

    //Get all validation messages from DB
    this.validationService.getSignInValidationMessages().subscribe({
      next: (data) => (this.validationMessages = data),
      error: (e) => {
        /*TODO: Handle error*/
      },
    });

    this.forgotPasswordForm.valueChanges.subscribe((control) => {
      this.validationService.validateFormData(
        this.forgotPasswordForm,
        this.validationMessages,
        this.formErrors
      );
    });
  }

  onSubmit() {
    this.sendEmail = true;
    this.forgotPasswordForm.markAllAsTouched();
    setTimeout(() => {
      //creating delay
      this.validationService.validateFormData(
        this.forgotPasswordForm,
        this.validationMessages,
        this.formErrors
      );
      if (this.forgotPasswordForm.valid) {
        this.alert.showAlert(
          AlertType.Success,
          'Email sent for reset password'
        );
      }
      this.sendEmail = false;
    }, 500);
  }
}
