/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {render} from 'react-dom';
import App from './containers/App';

import store from './store/';

const init = () => {

  render(
    <App store={store} />,
    document.querySelector(`.react-mount`)
  );

};

init();
