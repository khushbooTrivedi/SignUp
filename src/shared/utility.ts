export enum AlertType {
  Primary = 'primary',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}

export const Constants = {
  EMAIL_REGEX_PATTERN: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
  PASSWORD_REGEX_PATTERN: '^(?:(?=.*[a-z])(?=.*[A-Z]).*)$',

  message: {
    USER_CREATED_SUCCESS: 'User created successfully.',
    USER_LOGIN_FAIL: 'Email or Password are invalid.',
  },
};
