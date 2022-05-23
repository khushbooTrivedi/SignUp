#Instructions
SignUp form application is created with
- Angular 13
- Bootstrap 5

Following things are implemented:
1. Routing
2. JWT interceptor
3. Http interceptor for fake backend
4. Created SignUp,Login,Forgot Password form using Reactive form
5. Auth Guard
6. Unit Testing

Validations on SignUp Form
1. FirstName -> Required,Characters between(2-20)
2. LastName -> Required,Characters between(2-20)
3. Email -> Required,Regex pattern,created custom validator if some logic has to be implemented
4. Password -> Required,1 uppercase,1 lowercase,not contain user’s first or last name.
5. ConfirmPassword -> Required,Should match Password

Validations on Login Form 
1. Email -> Required,Regex pattern matching
2. Password -> Required

Validations on Forgot Password Form
1. Email -> Required,Regex pattern matching

#Unit Tests covered

All the validations on SignUp Form,Login Form and Forgot Password Form are covered 

#Not covered
Testing custom validators 

Steps to run:
1. Take clone
2. Run npm install
3. To run -> ng serve -o
4. To test -> ng test
5. To build -> ng build --prod

Flow
1.First screen -> Login screen
2. Click on link -> Create Today
3. Enter all fields and Sign In
4. Login
5. Go to landing page

Note: Fake Backend http interceptor is created to replicate API flow
      Currently users are stored in LocalStorage once you sign in.And when you login with same credentials they are stored in local storage as 'user'.
      Auth guard valid from local storage

# SignUp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
