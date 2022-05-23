import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private http: HttpClient) {}

  getSignInValidationMessages() {
    return this.http.get(`${environment.apiUrl}/validation/signin`);
  }

  validateFormData(group: FormGroup, validationMessages, formErrors) {
    Object.keys(group.controls).forEach((key) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.validateFormData(abstractControl, validationMessages, formErrors);
      } else {
        formErrors[key].message = '';
        formErrors[key].className = '';
        if (
          abstractControl &&
          abstractControl.invalid &&
          (abstractControl.touched || abstractControl.dirty)
        ) {
          const message = validationMessages[key];
          for (let errKey in abstractControl.errors) {
            formErrors[key].message += message[errKey] + ' ';
            formErrors[key].className = 'is-invalid';
          }
        } else if (abstractControl && abstractControl.touched) {
          formErrors[key].className = 'is-valid';
        }
      }
    });
  }
}
