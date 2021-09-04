import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SoundContext } from '../../Context/SoundContext';

const SoundChooser = () => {
  const history = useHistory();
  const { setSound } = useContext(SoundContext);
  return (
    <div className='sound-form'>
      <button
        onClick={() => {
          setSound('horns');
          history.push('/');
        }}
      >
        Horns
      </button>
      <button
        onClick={() => {
          setSound('bears');
          history.push('/');
        }}
      >
        Bears
      </button>
      <button
        onClick={() => {
          setSound('cats');
          history.push('/');
        }}
      >
        Cats
      </button>
    </div>
  );
};
export default SoundChooser;
