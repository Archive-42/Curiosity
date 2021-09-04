import React from 'react';
import AppContainer from './AppContainer';

import { Provider } from 'react-redux';

const Root = ({ store }) => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default Root;
