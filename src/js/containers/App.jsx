import React from 'react';

import {PropTypes as MPropTypes, observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

const App = ({store}) => {

  const {name} = store;

  return (
    <section>

      {process.env.NODE_ENV !== `production` ? <DevTools /> : null}

      <header>
        <h1>Hello, {name}</h1>
      </header>

    </section>
  );

};

App.propTypes = {
  store: MPropTypes.observableObject.isRequired
};

export default observer(App);
