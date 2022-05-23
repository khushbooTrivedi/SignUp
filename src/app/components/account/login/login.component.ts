import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ValidationService } from 'src/app/services/validation.service';
import { AlertType, Constants } from 'src/shared/utility';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validationMessages = {};
  loggedIn = false;
  returnUrl: string;
  @ViewChild('alert') alert: AlertComponent;

  formErrors = {
    email: { message: '', className: '' },
    password: { message: '', className: '' },
  };

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private router: Router,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.route.paramMap.subscribe((params) => {
      params.get('returnUrl')
        ? (this.returnUrl = params.get('returnUrl'))
        : '/';
    });

    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(Constants.EMAIL_REGEX_PATTERN),
        ],
      ],
      password: ['', [Validators.required]],
    });

    //Get all validation messages from DB
    this.validationService.getSignInValidationMessages().subscribe({
      next: (data) => {
        this.validationMessages = data;
      },
      error: (e) => {
        /*TODO: Handle error*/
      },
    });

    this.loginForm.valueChanges.subscribe((control) => {
      this.validationService.validateFormData(
        this.loginForm,
        this.validationMessages,
        this.formErrors
      );
    });
  }

  onSubmit() {
    this.loggedIn = true;
    this.loginForm.markAllAsTouched();
    this.alert.clearAlert();
    this.validationService.validateFormData(
      this.loginForm,
      this.validationMessages,
      this.formErrors
    );
    this.loggedIn = false;
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: (data) => {
          this.validationMessages = data;
          this.router.navigate(['../home']);
        },
        error: (e) => {
          this.alert.showAlert(
            AlertType.Danger,
            Constants.message.USER_LOGIN_FAIL
          );
        },
      });
    }
  }
}
