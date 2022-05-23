SignUp form application is created with
- Angular 13
- Bootstrap 5

Following things are implemented:
1. Routing
2. JWT interceptor
3. Http interceptor for fake backend
4. Created SignUp,Login,Forgot Password form using Reactive form
5. Auth Guard

Validations on SignUp Form
FirstName -> Required,Characters between(2-20)
LastName -> Required,Characters between(2-20)
Email -> Required,Regex pattern,created custom validator if some logic has to be implemented
Password -> Required,1 uppercase,1 lowercase,not contain user’s first or last name.
ConfirmPassword -> Required,Should match Password