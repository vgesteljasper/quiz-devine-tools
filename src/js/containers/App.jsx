import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {Switch} from 'react-router';
import React from 'react';

import Header from './../components/Header/';
import IndexPage from './IndexPage';
import QuizPage from './QuizPage';
import QuizObserverPage from './QuizObserverPage';

const App = () => {

  return (
    <Router>
      <div className='router-child'>
        <Header />
        <Switch>
          <Route exact path='/' component={IndexPage} />
          <Route exact path='/quiz/:id' render={({match}) => <QuizPage id={match.params.id} />} />
          <Route exact path='/quiz/observer/:id' render={({match}) => <QuizObserverPage id={match.params.id} />} />
          <Route render={() => <Redirect to='/' />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
