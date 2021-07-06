export const signupValidation = {
  email: {
    presence: {
      allowEmpty: false,
      message: '^Please enter an email address',
    },
    email: {
      message: '^Please enter a valid email address',
    },
  },
  firstName: {
    presence: {
      allowEmpty: false,
      message: '^Please enter a first name',
    },
  },
  lastName: {
    presence: {
      allowEmpty: false,
      message: '^Please enter a last name',
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: '^Please enter a password',
    },
    length: {
      minimum: 8,
      message: '^Your password must contain at least 8 characters',
    },
  },
  confirmPassword: {
    equality: {
      attribute: 'password',
      message: '^Your passwords do not match',
    },
  },
};

export default signupValidation;
