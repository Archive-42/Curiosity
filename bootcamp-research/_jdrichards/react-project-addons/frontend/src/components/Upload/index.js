// import axios from 'axios';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { upload } from '../../store/upload';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const onFileChange = (event) => {
    // Update the state

    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = (event) => {
    event.preventDefault();
    console.log('huh', selectedFile);
    // Create an object of formData
    let formData = new FormData();

    // Update the formData object
    formData.append('image', selectedFile);

    dispatch(upload(formData));
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Upload Photo</h1>
      <div>
        <input type='file' name='image' onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
      </div>
      {fileData()}
    </div>
  );
};

export default Upload;
