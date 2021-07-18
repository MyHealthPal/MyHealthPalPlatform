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
