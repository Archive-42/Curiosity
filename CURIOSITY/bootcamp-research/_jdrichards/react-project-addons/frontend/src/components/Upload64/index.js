import { useState } from 'react';

const Upload64 = () => {
  const [image, setImage] = useState('');
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convert(file);
    setImage(base64);
    console.log(base64);
  };

  const convert = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1>Upload64 Component</h1>
        <input
          type='file'
          onChange={(e) => {
            handleUpload(e);
          }}
        />
      </div>
      <div>
        {image && <img width='200' height='200' src={image} alt='base' />}
      </div>
    </div>
  );
};
export default Upload64;
