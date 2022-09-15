import { useState } from 'react';

import { VALIDATOR_REQUIRE } from '../methods/validators';

import Input from './Input';

const MusicUpload = ({ onInput }) => {
  const [filesInfo, setFilesInfo] = useState(false);

  const pickedHandler = (event) => {
    if (event.target.files) {
      let filesInfoArray = [];

      for (const file of event.target.files) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          filesInfoArray.push({
            name: file.name,
            size: file.size,
            url: fileReader.result,
          });
          setFilesInfo([...filesInfoArray]);
        };
        fileReader.readAsDataURL(file);
      }
    } else {
      setFilesInfo(false);
    }

    onInput('songFiles', event.target.files, true);
  };

  return (
    <div className='music-upload-container'>
      <input
        type='file'
        accept='.flac,.alac,.wav,.raw,.pcm,.sam'
        multiple
        id='songFiles'
        onChange={pickedHandler}
      />
      {filesInfo &&
        filesInfo.map((fileInfo) => (
          <div key={filesInfo.indexOf(fileInfo)}>
            <label>{fileInfo.name}</label>
            <Input
              element='input'
              id={`songTitle${filesInfo.indexOf(fileInfo)}`}
              type='text'
              label='Song Title'
              validators={[VALIDATOR_REQUIRE()]}
              onInput={onInput}
            />
          </div>
        ))}
    </div>
  );
};

export default MusicUpload;
