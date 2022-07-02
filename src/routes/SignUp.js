import { useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { useForm } from '../hooks/form-hook';

import Input from '../ui-elements/Input';

import { AuthContext } from '../context/auth-context';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from '../methods/validators';

import './form.css';

const SignUp = () => {
  const auth = useContext(AuthContext);
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
      const responseData = await axios({
        method: 'post',
        url: 'http://localhost:5000/api/users/signup',
        data: {
          username: formState.inputs.username.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        },
      });
      auth.login(formState.inputs.username.value, responseData.data.token);
      history.push('/player');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='form-container'>
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
        <button type='submit' disabled={!formState.isValid}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
