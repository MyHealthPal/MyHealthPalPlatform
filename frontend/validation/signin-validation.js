export const signinValidation = {
  email: {
    presence: {
      allowEmpty: false,
      message: "^Please enter an email address",
    },
    email: {
      message: "^Please enter a valid email address",
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: "^Please enter a password",
    },
  },
};

export default signinValidation;
