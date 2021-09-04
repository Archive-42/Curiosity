import { fetch } from './csrf.js';

const UPLOAD_PHOTO = 'upload/uploadPhoto';
const SET_PHOTO = 'upload/setPhoto';

const setPhoto = (photo) => {
  return {
    type: SET_PHOTO,
    photo
  };
};

export const upload = (image) => async (dispatch) => {
  // console.log('file', file);
  for (var value of image.values()) {
    console.log('keys', value);
  }

  // const newPhoto = {
  //   file: 'file',
  //   lastModified: file.lastModified,
  //   lastModifiedDate: file.lastModifiedDate,
  //   name: file.name,
  //   size: file.size,
  //   type: file.type
  // };

  const res = await fetch('/api/users/uploads', {
    method: 'POST',
    headers: {
      'Content-Type':
        'multipart/form-data; boundary=----WebKitFormBoundary9bL9rgFvbr8irIPJ'
    },
    body: image
  });
  console.log('res', res);

  // dispatch(setPhoto());
  // return res;
};

function uploadReducer(state = {}, action) {
  switch (action.type) {
    case SET_PHOTO:
      return { ...state, photo: action.photo };

    default:
      return state;
  }
}

export default uploadReducer;
