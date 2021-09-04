# **React Frontend Setup for Python API**

## **Table of Contents**

1. [Create React App](#1-create-react-app)
2. [Install Dependencies](#2-install-dependencies)
3. [Create `config.js` in root directory](#3-Create-configjs-in-root-directory)
4. [Create `store/authentication.js`](#4-Create-storeauthenticationjs)
5. [Configure the Redux Store](#5-Configure-the-Redux-Store)
6. [Modify `index.js`](#4-Modify-indexjs)
7. [Create a components dir and `SignUpForm.js` within](#7-Create-a-components-dir-and-SignUpFormjs-within)
8. [Create `LoginForm.js` Component](#8-Create-LoginFormjs-Component)
9. [Placeholder Component for Main Page](#9-Placeholder-Component-for-Main-Page)
10. [Create `Navigation.js`](#10-Create-Navigationjs)
11. [Create `ProtectedRoute.js`](#11-Create-ProtectedRoutejs)
12. [Modify `App.js`](#12-modify-appjs)
13. [Modify `PlaceHolder.js` for logout functionality](#13-modify-placeholderjs-for-logout-functionality)

---

## 1. Create React App

```bash
>>> npx create-react-app {{ project name }} --template @appacademy/simple
```

---

## 2. Install Dependencies

```bash
>>> npm install redux react-redux react-router-dom redux-thunk
```

---

## 3. Create `config.js` in src directory

```js
export const baseApiUrl = process.env.BASE_API_URL || `http://localhost:5000/api`
```

---

## 4. Create `store/authentication.js`

```js
import { baseApiUrl } from '../config';

const TOKEN_KEY = 'authentication/TOKEN_KEY';
const SET_TOKEN = 'authentication/SET_TOKEN';
const REMOVE_TOKEN = 'authentication/REMOVE_TOKEN';

export const removeToken = () => ({ type: REMOVE_TOKEN });
export const setToken = token => ({ type: SET_TOKEN, token });

export const loadToken = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch(setToken(token));
  }
};


export const signUp = user => async dispatch => {
  const response = await fetch(`${baseApiUrl}/users`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const { token } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    dispatch(setToken(token));
  }
}


export const login = (username, password) => async dispatch => {
  const response = await fetch(`${baseApiUrl}/users`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const token = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    dispatch(setToken(token));
  }
};


export const logout = () => async dispatch => {
  window.localStorage.removeItem(TOKEN_KEY);
  dispatch(removeToken());
}


export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }

    case REMOVE_TOKEN: {
      const newState = { ...state };
      delete newState.token;
      return newState;
    }

    default: return state;
  }
}
```

---

## 5. Configure the Redux Store

```js
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import authentication from './authentication';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  // TODO: Add Reducers here
  authentication,
});

const configureStore = initialState => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
};

export default configureStore;
```

---

## 6. Modify `index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';


// TODO: Set initialState and pass it into configureStore()

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

---

## 7. Create a components dir and `SignUpForm.js` within

```js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../store/authentication';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const dispatch = useDispatch();

  const updateProperty = callback => (e) => {
    callback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target)
    const newUser = {
      username,
      email,
      password,
      confirm,
    };
    console.log("handleSubmit -> newUser", newUser)
    dispatch(signUp(newUser))
  };

  return (
    <main>
      <h1>Sign Up Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={updateProperty(setUsername)}
          required />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={updateProperty(setEmail)}
          required />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={updateProperty(setPassword)} />
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirm}
          onChange={updateProperty(setConfirm)} />
      <button type='submit'>Sign Up</button>
      </form>
    </main>
  );
};

export default SignUpForm;
```

---

## 8. Create `LoginForm.js` Component

```js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../store/authentication';

const LoginForm = () => {
  const [username, setUsername] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const token = useSelector((state) => state.authentication.token);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  if (token) {
    return <Redirect to='/' />;
  }
  
  return (
    <main>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Email'
          value={username}
          onChange={updateProperty(setUsername)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={updateProperty(setPassword)}
        />
        <button type='submit'>Login</button>
      </form>
    </main>
  )
};

export default LoginForm;
```

---

## 9. Placeholder Component for Main Page

```js
import React from 'react';

const PlaceHolder = () => {
  
  return (
    <h1>Protected Main Page</h1>
  )
};

export default PlaceHolder;
```

---

## 10. Create `Navigation.js`

```js
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => (
  <>
    <NavLink exact to='/' className="is-active">Home</NavLink>
    <NavLink exact to='/login' className="is-active">Log In</NavLink>
    <NavLink exact to='/signup' className="is-active">Sign Up</NavLink>
  </>
);

export default Navigation;
```

---

## 11. Create `ProtectedRoute.js`

```js
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = props => {
  const { isLoggedIn } = props;
  if (!isLoggedIn) {
    return <Redirect to='/login' />
  }
  return <Route { ...props } />;
}

export default ProtectedRoute;
```

---

## 12. Modify `App.js`

```js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import PlaceHolder from './components/PlaceHolder';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import { loadToken } from './store/authentication';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const token = useSelector(state => state.authentication.token);
  // const token = false
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setLoaded(true);
    dispatch(loadToken());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (!loaded) return null;
  
  return (
  <BrowserRouter>
    <Navigation />
    <Switch>
      <ProtectedRoute isLoggedIn={token} path='/' exact={ true } component={ PlaceHolder } />
      <Route path='/login' exact={ true } component={ LoginForm } />
      <Route path='/signup' exact={ true } component={ SignUpForm } />
    </Switch>
  </BrowserRouter>
  )
}


export default App;
```

---

## 13. Modify `PlaceHolder.js` for logout functionality

```js
import { useDispatch } from 'react-redux';
import { logout } from '../store/authentication';


const PlaceHolder = () => {
  const dispatch = useDispatch();
  
  const handleClick = () => dispatch(logout());

  return (
    <>
      <h1>Protected Main Page</h1>
      <button onClick={handleClick} >Log Out</button>
    </>
  )
};

export default PlaceHolder;
```
