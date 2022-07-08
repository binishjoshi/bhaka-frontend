import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { useForm } from '../hooks/form-hook';

import Button from '../ui-elements/Button';
import Input from '../ui-elements/Input';

import { AuthContext } from '../context/auth-context';
import { useHttpClient } from '../hooks/http-hook';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from '../methods/validators';

import './form.css';
import ErrorModal from '../ui-elements/ErrorModal';

const SignUp = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: '',
        isValid: false,
      },
      email: {
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

  const signUpHandler = async (event) => {
    event.preventDefault();
    try {
      // const responseData = await axios({
      //   method: 'post',
      //   url: 'http://localhost:5000/api/users/signup',
      //   data: {
      //     username: formState.inputs.username.value,
      //     email: formState.inputs.email.value,
      //     password: formState.inputs.password.value,
      //   },
      // });
      const responseData = await sendRequest(
        'http://localhost:5000/api/users/signup',
        'POST',
        JSON.stringify({
          username: formState.inputs.username.value,
          email: formState.inputs.email.value,
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
      <ErrorModal error={error} onClear={clearError} />
      <h3>Sign Up</h3>
      <form onSubmit={signUpHandler}>
        <Input
          element='input'
          id='username'
          type='text'
          label='Username'
          errorText='Username should be of minimum length 6 and maximum 20'
          validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_MAXLENGTH(20)]}
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='email'
          type='email'
          label='E-Mail'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Please enter a valid email address'
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='password'
          type='password'
          label='Password'
          validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_MAXLENGTH(64)]}
          errorText='Password should be of minimum length 8 and maximum 64'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid || isLoading}>
          {!isLoading ? 'Sign Up' : 'Signing Up'}
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
