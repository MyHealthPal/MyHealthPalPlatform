export const createProfileValidation = {
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
  DateOfBirth: {
    presence: {
      allowEmpty: false,
      message: '^Please select your date of birth',
    },
  },
};

export default createProfileValidation;
