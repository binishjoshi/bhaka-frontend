import { useState } from 'react';
import { lanAddress } from '../.lanAddress';
import { useForm } from '../hooks/form-hook';
import { useHttpClient } from '../hooks/http-hook';

import { Link } from 'react-router-dom';

import { VALIDATOR_REQUIRE } from '../methods/validators';

import Button from './Button';
import Input from './Input';
import Modal from './Modal';

import './create-playlist-modal.css';

const CreatePlaylistModal = (props) => {
  //eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [createSuccess, setCreateSuccess] = useState(false);
  const [playlistId, setPlaylistId] = useState(false);
  const storedToken = JSON.parse(localStorage.getItem('userData')).token;
  const [formState, inputHandler] = useForm({
    name: {
      value: '',
      isValid: false,
    },
    description: {
      value: '',
      isValid: true,
    },
  });

  const handleSubmit = async () => {
    console.log(formState);
    try {
      const responseData = await sendRequest(
        `http://${lanAddress}:5000/api/playlists/create`,
        'POST',
        JSON.stringify({
          name: formState.inputs.name.value,
          description: formState.inputs.description.value,
        }),
        {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        }
      );
      setCreateSuccess(true);
      setPlaylistId(responseData.playlistId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal onCancel={props.onClose} show={props.show}>
      <h4>Create Playlist</h4>
      <Input
        element='input'
        id='name'
        label='Playlist Name'
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText='Enter playlist name'
      />
      <Input
        element='text'
        id='description'
        label='Playlist Descripton'
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Enter playlist description'
      />
      <Button
        onClick={handleSubmit}
        hover
        disabled={!formState.isValid || createSuccess}
      >
        Create
      </Button>
      {createSuccess && (
        <span className='success-message'>
          Playlist{' '}
          {
            <Link to={`/playlist/${playlistId}`}>
              {formState.inputs.name.value}
            </Link>
          }{' '}
          successfully created.
        </span>
      )}
    </Modal>
  );
};

export default CreatePlaylistModal;
