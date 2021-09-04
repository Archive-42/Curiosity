import { Route, Switch, NavLink } from 'react-router-dom';
import Player from './components/Player';
import SoundChooser from './components/SoundChooser';
function App() {
  return (
    <div className='container'>
      <div className='left'>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/sounds'>Choose Sounds</NavLink>
          </li>
          <li>
            <NavLink to='/player'>Play Sounds</NavLink>
          </li>
        </ul>
      </div>
      <div className='right'>
        <Switch>
          <Route exact path='/'>
            <h3>
              SOUNDPLAYER
              <br />
              <br />
              1. Click 'Choose Sounds' to choose the type of sound you want.
              <br />
              <br />
              2. Click Player Sounds to play the sounds you have chosen and want
              to hear.
            </h3>
          </Route>
          <Route path='/sounds'>
            <SoundChooser />
          </Route>
          <Route path='/player'>
            <Player />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
