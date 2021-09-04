import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './privateRoute';
import Landing from './components/landingComponents/Landing';
import Home from './components/homeComponents/Home'
import { loadUser } from './helpers/auth'
import PageNotFound from './components/PageNotFound';
import QuestResults from './components/quests/QuestResults';
import Characters from './components/homeComponents/Characters';
import { authContext } from './Context';
// import QuestSetup from './components/quests/QuestSetup';
import CreateCharacter from './components/homeComponents/CreateCharacter';
import SurvivalSetup from './components/survival/SurvivalSetup';
import SurvivalGame from './components/survival/SurvivalGame';


function App() {
  const [id, setId] = useState(null);
  const authContextValue = { id, setId };

  useEffect(() => {
    const data = loadUser();
    setId(data.id)
  }, [])


  return (
    <authContext.Provider value={authContextValue}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path='/' isLoggedIn={id} component={Home} />
          <PrivateRoute path ='/quests' isLoggedIn={id} component={QuestResults} />
          <PrivateRoute path ='/characters' isLoggedIn={id} component={Characters} />
          <PrivateRoute path ='/character-creator' isLoggedIn={id} component={CreateCharacter} />
          <PrivateRoute path='/survival-start' isLoggedIn={id} component={SurvivalSetup} />
          <PrivateRoute path='/survival/:id' isLoggedIn={id} component={SurvivalGame} />
          <Route path='/login' component={Landing}/>
          <Route component={PageNotFound}/>
        </Switch>
      </BrowserRouter>
    </authContext.Provider>
  );
}

export default App;
