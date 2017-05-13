import {BrowserRouter as Router} from 'react-router-dom';
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Switch} from 'react-router';

import Header from './../components/Header/';
import Footer from './../components/Footer';
import IndexPage from './IndexPage';
import QuizPage from './QuizPage';

const App = () => (
  <Router>
    <div className='router-child'>
      <Header />
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

export default App;
