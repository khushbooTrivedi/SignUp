import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static emailDomain(domainName: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value;
      const domain = email.substring(email.lastIndexOf('@') + 1);
      if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
        return null;
      } else {
        return { emailDomain: true };
      }
    };
  }

  static mismatch(controlName: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control || !control.parent) {
        return null;
      }
      const confirmPassword = control.value;
      const password = control.parent.get(controlName)?.value;
      if (
        confirmPassword === '' ||
        confirmPassword.toLowerCase() === password.toLowerCase()
      ) {
        return null;
      } else {
        return { mismatch: true };
      }
    };
  }

  static containsUserName(controlName1: string, controlName2: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control || !control.parent) {
        return null;
      }
      const group = control.parent;
      const password = control.value;
      const value1 = group.get(controlName1)?.value;
      const value2 = group.get(controlName2)?.value;

      if (
        password &&
        ((value1 && password.includes(value1)) ||
          (value2 && password.includes(value2)))
      ) {
        return { containsUserName: true };
      } else {
        return null;
      }
    };
  }
}
