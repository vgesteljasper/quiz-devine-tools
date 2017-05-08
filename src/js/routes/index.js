/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {Route, Switch} from 'react-router-dom';

export default (
  <div>
    <h1>Hello React Router</h1>
    <Switch>
      <Route exact path={`/test`} render={() => `/test`} />
      <Route exact path={`/hello/:name`} render={() => `/hello/name`} />
      <Route exact path={`/hellostate/:name`} render={() => `/hellostate/name`} />
      <Route exact path={`/hello/:name/:params`} render={() => `/hello/name/params`} />
      <Route render={() => `not found`} />
    </Switch>
  </div>
);
