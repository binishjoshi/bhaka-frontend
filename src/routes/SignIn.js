import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { useForm } from '../hooks/form-hook';
import { useHttpClient } from '../hooks/http-hook';
import { VALIDATOR_REQUIRE } from '../methods/validators';

import { AuthContext } from '../context/auth-context';

import Button from '../ui-elements/Button';
import Input from '../ui-elements/Input';

const SignIn = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
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

  const signInHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        'http://localhost:5000/api/users/signin',
        'POST',
        JSON.stringify({
          username: formState.inputs.username.value,
          password: formState.inputs.password.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      auth.login(formState.inputs.username.value, responseData.token);
      history.push('/player');
    } catch (error) {
      console.log(error.message);
    }
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
        <Button type='submit' disabled={!formState.isValid}>
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
