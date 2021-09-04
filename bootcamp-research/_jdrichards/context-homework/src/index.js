import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SoundProvider from './Context/SoundContext';
import { BrowserRouter } from 'react-router-dom';

const Root = () => {
  return (
    <BrowserRouter>
      <SoundProvider>
        <App />
      </SoundProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
