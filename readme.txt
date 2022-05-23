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
FirstName -> Required,Characters between(2-20)
LastName -> Required,Characters between(2-20)
Email -> Required,Regex pattern,created custom validator if some logic has to be implemented
Password -> Required,1 uppercase,1 lowercase,not contain user’s first or last name.
ConfirmPassword -> Required,Should match Password

Validations on Login Form 
Email -> Required,Regex pattern matching
Password -> Required

Validations on Forgot Password Form
Email -> Required,Regex pattern matching

Unit Tests covered
All the validations on SignUp Form,Login Form and Forgot Password Form are covered 

Not covered
Testing custom validators 

