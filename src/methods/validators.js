const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });

export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});

export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});

export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

export const validate = (value, validators) => {
  let isValid = true;

  for (const validator of validators) {
    switch (validator.type) {
      case VALIDATOR_TYPE_REQUIRE:
        isValid = isValid && value.trim().length > 0;
        break;
      case VALIDATOR_TYPE_MINLENGTH:
        isValid = isValid && value.trim().length >= validator.val;
        break;
      case VALIDATOR_TYPE_MAXLENGTH:
        isValid = isValid && value.trim().length <= validator.val;
        break;
      case VALIDATOR_TYPE_EMAIL:
        isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        break;
      default:
        console.log('Invalid validators');
    }
  }
  return isValid;
};
