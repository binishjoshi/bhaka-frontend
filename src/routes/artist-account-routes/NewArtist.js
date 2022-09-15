import { useState } from 'react';

import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/form-hook';
import { useHttpClient } from '../../hooks/http-hook';

import { VALIDATOR_REQUIRE } from '../../methods/validators';

import Button from '../../ui-elements/Button';
import ErrorModal from '../../ui-elements/ErrorModal';
import ImageUpload from '../../ui-elements/ImageUpload';
import Modal from '../../ui-elements/Modal';

import Input from '../../ui-elements/Input';

import { lanAddress } from '../../.lanAddress';

const NewArtist = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [createError, setCreateError] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [artistId, setArtistId] = useState(null);
  const [formState, inputHandler] = useForm({
    name: {
      value: '',
      isValid: false,
    },
    description: {
      value: '',
      isValid: false,
    },
    image: {
      value: null,
      isValid: false,
    },
  });

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const storedToken = JSON.parse(localStorage.getItem('userData')).token;
    try {
      const formData = new FormData();
      formData.append('name', formState.inputs.name.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('artistImage', formState.inputs.image.value);
      const responseData = await sendRequest(
        `http://${lanAddress}:5000/api/artists/create`,
        'POST',
        formData,
        {
          Authorization: `Bearer ${storedToken}`,
        }
      );
      setCreateError(false);
      setCreateSuccess(true);
      setArtistId(responseData.artistId);
    } catch (error) {
      console.log(error);
      setCreateError(true);
    }
  };

  return (
    <div className='new-artist-form-container'>
      <ErrorModal onCancel={clearError} error={error} show={createError} />
      <Modal
        header='Artist successfully created'
        show={createSuccess}
        footer={
          <Link to={`/status/artist/${artistId}`}>
            Go to artist status page
          </Link>
        }
      />
      <form onSubmit={formSubmitHandler}>
        <Input
          element='input'
          id='name'
          type='text'
          label='Artist Title'
          errorText='Enter artist title'
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          element='text'
          id='description'
          type='text'
          label='Artist Description'
          errorText='Enter artist description'
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <ImageUpload id='image' label='Artist Image' onInput={inputHandler} />
        <Button
          type='submit'
          disabled={!formState.isValid || isLoading}
          onInput={inputHandler}
        >
          {isLoading ? 'Creating' : 'Create'}
        </Button>
      </form>
    </div>
  );
};

export default NewArtist;
