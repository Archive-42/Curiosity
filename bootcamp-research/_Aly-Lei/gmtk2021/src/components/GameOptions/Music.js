import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import song from "../../music/infados-by-kevin-macleod.mp3";
import mute from "../../images/music/Mute_Icon.svg";
import playButton from "../../images/music/Speaker_Icon.svg";

const Music = ({ musicPlaying, setMusicPlaying }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound(song);

  useEffect(() => {
    if (musicPlaying) {
      play();
      setIsPlaying(true);
    }
  }, [musicPlaying, play]);

  const handleClick = () => {
    if (!isPlaying && !musicPlaying) {
      play();
      setIsPlaying(!isPlaying);
    } else {
      stop();
      setIsPlaying(!isPlaying);
      setMusicPlaying(false);
    }
  };

  return (
    <div className="musicContainer" onClick={handleClick}>
      {/* <img
        src={isPlaying ? mute : playButton}
        className="music"
        alt="music player"
      /> */}
    </div>
  );
};

export default Music;
