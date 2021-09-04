import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { upload } from '../../store/upload';

// const Preview = ({ meta }) => {
//   const { name, percent, status } = meta;
//   return (
//     <span
//       style={{
//         alignSelf: 'flex-start',
//         margin: '10px 3%',
//         fontFamily: 'Helvetica'
//       }}
//     >
//       {name}, {Math.round(percent)}%, {status}
//     </span>
//   );
// };

function Upload() {
  const dispatch = useDispatch();
  const getUploadParams = ({ file }) => {
    const body = new FormData();
    body.append('image', file);
    // dispatch(upload(body));
    return {
      url: '/api/uploads',
      body
    };
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      inputContent='Drop Files (Custom Preview)'
      disabled={(files) =>
        files.some((f) =>
          ['preparing', 'getting_upload_params', 'uploading'].includes(
            f.meta.status
          )
        )
      }
    />
  );
}

export default Upload;
