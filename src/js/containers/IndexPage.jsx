import React from 'react';
import {observer, inject, PropTypes} from 'mobx-react';
import {bool} from 'prop-types';

import QuizLink from './../components/Quiz/Link';

const IndexPage = ({quizzes, adminActive}) => {

  const classes = [`content`, `quiz-list`];
  adminActive ? classes.push(`monitoring`) : classes;

  // stop all Questions from monitoring votes
  // eg: if coming back from other route where votes were updating
  quizzes.forEach(quiz => {
    quiz.questions.forEach(question => {
      if (question.setInterval) question.stopMonitoringVotes();
    });
  });

  return (
    <main className={classes.join(` `)}>
      {quizzes.map(q => <QuizLink key={q.id} {...q} adminActive={adminActive} />)}
    </main>
  );
};

IndexPage.propTypes = {
  quizzes: PropTypes.observableArray.isRequired,
  adminActive: bool.isRequired,
};

export default inject(({store}) => {
  const {quizzes, adminActive} = store;
  return {quizzes, adminActive};
})(observer(IndexPage));
