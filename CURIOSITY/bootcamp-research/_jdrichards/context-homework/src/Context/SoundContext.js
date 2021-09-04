import { createContext, useState } from 'react';
import { horns, bears, cats } from '../data/sounds';

export const SoundContext = createContext();

export default function SoundProvider(props) {
  const [sound, setSound] = useState('bears');

  return (
    <SoundContext.Provider
      value={{
        sound,
        setSound,
        cats,
        horns,
        bears
      }}
    >
      {props.children}
    </SoundContext.Provider>
  );
}
