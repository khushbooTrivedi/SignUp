import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ValidationService } from 'src/app/services/validation.service';
import { User } from 'src/models/user.model';
import { CustomValidators } from 'src/shared/custom.validators';
import { AlertType, Constants } from 'src/shared/utility';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signInForm: FormGroup;
  signIn = false;
  validationMessages = {};
  @ViewChild('alert') alert: AlertComponent;

  //Stores all errors of the form
  formErrors = {
    firstName: { message: '', className: '' },
    lastName: { message: '', className: '' },
    email: { message: '', className: '' },
    password: { message: '', className: '' },
    confirmPassword: { message: '', className: '' },
  };

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    //using FormBuilder
    this.signInForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(Constants.EMAIL_REGEX_PATTERN),
          // CustomValidators.emailDomain('test.com'), //we can add custom logic to verify email
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(Constants.PASSWORD_REGEX_PATTERN),
          CustomValidators.containsUserName('firstName', 'lastName'),
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, CustomValidators.mismatch('password')],
      ],
    });

    //Get all validation messages from DB
    this.validationService.getSignInValidationMessages().subscribe({
      next: (data) => (this.validationMessages = data),
      error: (e) => {
        /*TODO: Handle error*/
        console.log(e);
      },
    });

    this.signInForm.valueChanges.subscribe((control) => {
      this.validationService.validateFormData(
        this.signInForm,
        this.validationMessages,
        this.formErrors
      );
    });
  }

  onCancel() {
    this.router.navigate(['account/login']);
  }

  onSubmit() {
    this.signIn = true;
    this.signInForm.markAllAsTouched();
    this.validationService.validateFormData(
      this.signInForm,
      this.validationMessages,
      this.formErrors
    );
    if (this.signInForm.valid) {
      let obj: User = { ...this.signInForm.value };
      this.accountService.signUp(obj).subscribe({
        next: (data) => {
          this.alert.showAlert(
            AlertType.Success,
            Constants.message.USER_CREATED_SUCCESS
          );
          this.signIn = false;
          this.router.navigate(['login']);
        },
        error: (e) => {
          this.signIn = false;
          /*TODO: Handle error*/
          console.log(e);
        },
      });
    }
    this.signIn = false;
  }
}
