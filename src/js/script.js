/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {render} from 'react-dom';
import App from './containers/App';
import {Provider} from 'mobx-react';

import store from './store/';

const init = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`.react-mount`)
  );
};

init();
