import { useForm } from '../hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../methods/validators';

import Input from '../ui-elements/Input';

const SignIn = () => {
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const signInHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };
  return (
    <div className='form-container'>
      <h3>SignIn</h3>
      <form onSubmit={signInHandler}>
        <Input
          element='input'
          id='username'
          type='text'
          label='Username'
          errorText='Enter username'
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='password'
          type='password'
          label='Password'
          errorText='Enter password'
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <button type='submit' disabled={!formState.isValid}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
