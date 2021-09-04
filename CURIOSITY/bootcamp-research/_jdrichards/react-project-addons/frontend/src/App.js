import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Calendar from './components/Calendar';
import Appointments from './components/Appointments';
import DatePicker from './components/DatePicker';
import Googer from './components/Googer';
import ModalTest from './components/ModalTest';
import Upload from './components/Upload';
import Upload64 from './components/Upload64';
import CreateUser from './components/CreateUserS3';
import MyChart from './components/Chart';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route exact path='/date'>
            <DatePicker />
          </Route>
          <Route exact path='/calendar'>
            <Calendar />
          </Route>
          <Route exact path='/appointments'>
            <Appointments />
          </Route>
          <Route exact path='/googer'>
            <Googer />
          </Route>
          <Route exact path='/chart'>
            <MyChart />
          </Route>
          <Route exact path='/modal'>
            <ModalTest />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/upload'>
            <Upload />
          </Route>
          <Route exact path='/upload-base'>
            <Upload64 />
          </Route>
          <Route exact path='/create-user'>
            <CreateUser />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
