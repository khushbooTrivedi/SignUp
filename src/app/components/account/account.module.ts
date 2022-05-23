import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [CommonModule, AccountRoutingModule, SharedModule],
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    LayoutComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountModule {}
