import {BrowserRouter as Router} from 'react-router-dom';
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Switch} from 'react-router';
import {inject} from 'mobx-react';
import {bool} from 'prop-types';

import Header from './../components/Header/';
import Footer from './../components/Footer';
import IndexPage from './IndexPage';
import QuizPage from './QuizPage';
import Add from './../components/Add/';

const App = ({isCreating}) => (
  <Router>
    <div className='router-child'>
      <Header />
      {isCreating ? <Add /> : null}
      <Switch>
        <Route exact path='/' component={IndexPage} />
        <Route exact path='/quiz/:id' render={({match}) => <QuizPage match={match} />} />
        <Route exact path='/quiz/observer/:id' render={({match}) => <QuizPage match={match} />} />
        <Route render={() => <Redirect to='/' />} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

App.propTypes = {
  isCreating: bool.isRequired
};

export default inject(({store}) => {
  return {isCreating: store.isCreating};
})(App);
