import { useContext } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { SoundContext } from '../../Context/SoundContext';

function Player() {
  const sounds = useContext(SoundContext);

  return (
    <div className='player'>
      <h2>{sounds.sound.toUpperCase()}</h2>
      {sounds[sounds.sound].map((sound, idx) => {
        return (
          <div key={sound}>
            <h2>Sound {idx + 1}</h2>
            <ReactAudioPlayer src={sound} controls />
          </div>
        );
      })}
    </div>
  );
}

export default Player;
