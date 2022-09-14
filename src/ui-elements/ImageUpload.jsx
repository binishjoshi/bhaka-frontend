import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import './image-upload.css';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const imageInputRef = useRef(null);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = (event) => {
    event.preventDefault();
    imageInputRef.current.click();
  };

  return (
    <div className='image-upload-container'>
      <label>{props.label}</label>
      <input
        id={props.id}
        ref={imageInputRef}
        type='file'
        style={{ display: 'none' }}
        accept='.jpg,.png,.jpeg,.webp'
        onChange={pickedHandler}
      />

      <div className='image-upload-ui'>
        {previewUrl && (
          <div className='image-preview-container'>
            <img src={previewUrl} alt='preview' />
          </div>
        )}
        <Button onClick={pickImageHandler}>PICK IMAGE</Button>
      </div>
    </div>
  );
};

export default ImageUpload;
