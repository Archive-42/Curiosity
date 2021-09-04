import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const StartMenu = ({setMusicPlaying}) => {
  const [entryState, setEntryState] = useState('begin')
  // useEffect(() => {
  //   // const entryStatus = sessionStorage.getItem('entryStatus')
  //   if(entryStatus === 'start'){
  //     setEntryState(entryStatus)
  //   }
  // }, [])

  const handleBegin = () => {
    // sessionStorage.setItem('entryStatus', 'start')
    setEntryState('start')
  }

  const handleClick = () => {
    setMusicPlaying(true)
  }

  return (
    <div className="startMenuContainer">
      <div className="startMenuHeaderContainer">
        <div className="startMenuHeader">Potion Power</div>
      </div>
      { entryState === 'begin' ?
      <div className="beginContainer">
        <button onClick={handleBegin}>Begin</button>
      </div>
      :
      <div className="optionsContainer">
        <div className="startMenuOptions">
          <Link to={"/game"} className="link" onClick={handleClick}>
              Play
          </Link>
          {/*<Link to={"/tutorial"} className="link">*/}
          {/*  Tutorial*/}
          {/*</Link>*/}
          {/*<Link to={"/credits"} className="link">*/}
          {/*  Credits*/}
          {/*</Link>*/}
        </div>
      </div>}
      <footer className="footer">
          <small>
              <a href='https://www.freepik.com/vectors/book'>Background magic classroom vector created by upklyak - www.freepik.com</a>
          </small>
      </footer>
    </div>
  );
};

export default StartMenu;
