import React from 'react';
import {observer, inject, PropTypes} from 'mobx-react';
import {bool, func} from 'prop-types';

import QuizLink from './../components/Quiz/Link';

const IndexPage = ({stopMonitoringVotes, quizzes, adminActive}) => {

  const classes = [`content`, `quiz-list`];
  adminActive ? classes.push(`monitoring`) : classes;

  // in case you pop state with back button
  // or came back with router
  stopMonitoringVotes();

  return (
    <main className={classes.join(` `)}>
      {quizzes.map(q => <QuizLink key={q.id} {...q} adminActive={adminActive} />)}
    </main>
  );
};

IndexPage.propTypes = {
  stopMonitoringVotes: func.isRequired,
  quizzes: PropTypes.observableArray.isRequired,
  adminActive: bool.isRequired,
};

export default inject(({store}) => {
  const {stopMonitoringVotes, quizzes, adminActive} = store;
  return {stopMonitoringVotes, quizzes, adminActive};
})(observer(IndexPage));
