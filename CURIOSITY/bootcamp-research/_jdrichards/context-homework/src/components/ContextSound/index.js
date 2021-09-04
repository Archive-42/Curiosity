function ContextSound({ sound, num }) {
  const playAudio = () => {
    const audioEl = document.getElementsByClassName('audio-element')[num];
    audioEl.play();
  };

  console.log(sound, num);

  return (
    <div>
      <button onClick={playAudio}>
        <span>Play Audio {num}</span>
      </button>
      <audio className='audio-element'>
        <source src={sound}></source>
      </audio>
    </div>
  );
}
export default ContextSound;
