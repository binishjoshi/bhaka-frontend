import { useEffect, useState } from 'react';
import { useForm } from '../../hooks/form-hook';
import { useHttpClient } from '../../hooks/http-hook';

import { Link } from 'react-router-dom';

import { VALIDATOR_REQUIRE } from '../../methods/validators';

import Button from '../../ui-elements/Button';
import Input from '../../ui-elements/Input';
import Modal from '../../ui-elements/Modal';
import MusicUpload from '../../ui-elements/MusicUpload';

import { lanAddress } from '../../.lanAddress';
import ImageUpload from '../../ui-elements/ImageUpload';

const NewAlbum = () => {
  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [options, setOptions] = useState([]);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [albumId, setAlbumId] = useState(null);
  const [formState, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false,
    },
    year: {
      value: '',
      isValid: false,
    },
    artist: {
      value: '',
      isValid: false,
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const storedToken = JSON.parse(localStorage.getItem('userData')).token;

    try {
      const formData = new FormData();
      let songInfoArray = [];
      formData.append('title', formState.inputs.title.value);
      formData.append('type', formState.inputs.albumType.value);
      formData.append('year', formState.inputs.year.value);
      formData.append('artist', formState.inputs.artist.value);
      formData.append('coverImage', formState.inputs.image.value);

      const formKeys = Object.keys(formState.inputs);
      const songKeys = formKeys.filter((formKey) =>
        formKey.match(/songTitle\d/)
      );
      for (let i = 0; i < songKeys.length; i++) {
        formData.append('songFiles', formState.inputs.songFiles.value[i]);
        songInfoArray.push({
          title: formState.inputs[songKeys[i]].value,
          featuredArtist: [],
          genre: [],
        });
      }
      formData.append('songs', JSON.stringify({ songs: songInfoArray }));

      const responseData = await sendRequest(
        `http://${lanAddress}:5000/api/albums/create`,
        'POST',
        formData,
        {
          Authorization: `Bearer ${storedToken}`,
        }
      );
      setAlbumId(responseData.albumId);
      setCreateSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('userData')).token;
    const getOptions = async () => {
      try {
        const responseData = await sendRequest(
          `http://${lanAddress}:5000/api/artist-accounts/artists`,
          'GET',
          null,
          {
            Authorization: `Bearer ${storedToken}`,
          }
        );
        let optionsArray = [];
        for (let i = 0; i < responseData.artists.length; i++) {
          optionsArray.push({
            value: responseData.artists[i].artistId,
            optionName: responseData.artists[i].artistName,
          });
        }
        setOptions(optionsArray);
      } catch (error) {
        console.log(error);
      }
    };
    getOptions();
  }, [sendRequest]);

  return (
    <div className='new-album-container'>
      {/* <ErrorModal onCancel={clearError} error={error} show={createError} /> */}
      <Modal
        header='Album successfully created'
        show={createSuccess}
        footer={
          <Link to={`/status/album/${albumId}`}>Go to album status page</Link>
        }
      />
      <form onSubmit={handleFormSubmit}>
        <Input
          element='option'
          id='artist'
          label='Select Artist'
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          options={options}
        />
        <Input
          element='option'
          id='albumType'
          label='Select Album Type'
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          options={[
            { value: 'Single', optionName: 'Single' },
            { value: 'EP', optionName: 'EP' },
            { value: 'Album', optionName: 'Album' },
          ]}
        />
        <Input
          element='input'
          id='title'
          type='text'
          label='Album title'
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='year'
          type='number'
          label='Album Release Year'
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <MusicUpload onInput={inputHandler} />
        <ImageUpload
          id='image'
          label='Album Cover Art'
          onInput={inputHandler}
        />
        <Button
          type='submit'
          disabled={!formState.isValid || isLoading}
          onInput={inputHandler}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default NewAlbum;
