import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/validation/signin') && method === 'GET':
          return signInvalidationMessages();
        case url.endsWith('/login') && method === 'POST':
          return authenticate();
        case url.endsWith('/logout') && method === 'POST':
          return logOut();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function signInvalidationMessages() {
      const validationMessages = {
        firstName: {
          required: 'First Name is required.',
          minlength: 'First Name must be greater than 2 characters.',
          maxlength: 'First Name must be less than 20 characters.',
        },
        lastName: {
          required: 'Last Name is required.',
          minlength: 'Last Name must be greater than 2 characters.',
          maxlength: 'Last Name must be less than 20 characters.',
        },
        email: {
          required: 'Email is required.',
          emailDomain: 'Email domian should be test.com',
          pattern: 'Email is not in correct format',
          email: 'Email is not in correct format',
        },
        password: {
          required: 'Password required.',
          minlength: 'Password must be greater than 8 characters.',
          pattern: 'Password must contain lower and uppercase letters',
          containsUserName: 'Password should not contain first or last name',
        },
        confirmPassword: {
          required: 'Confirm Password is required.',
          mismatch: "Confirm Password doesn't match with Password",
        },
      };
      return ok(validationMessages);
    }

    function authenticate() {
      // array in local storage for registered users
      let users = localStorage.getItem('users')
        ? JSON.parse(localStorage.getItem('users'))
        : [];
      const { email, password } = body;
      let user = body;
      user = users.find(
        (x: { email: any; password: any }) =>
          x.email === email && x.password === password
      );
      if (!user) {
        return error('Email or password is incorrect');
      } else {
        localStorage.setItem('user', JSON.stringify(user));
        return ok({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          token: 'fake-jwt-token',
        });
      }
    }

    function logOut() {
      localStorage.removeItem('user');
      return ok();
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
