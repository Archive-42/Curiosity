import React from 'react';
import styled from 'styled-components';
import './App.css'

//components
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

const Root = styled.div`
display: flex;
`

const App = () => {
  return (
    <Root>
      <Header />
      <Body />
      <Footer />
    </Root>
  );
}

export default App;
