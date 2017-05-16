import React from 'react';
import {inject, observer, PropTypes} from 'mobx-react';

import QuizLink from './../components/Quiz/Link';

const IndexPage = ({store}) => {

  const {adminActive, quizzes, stopMonitoringQuiz} = store;

  stopMonitoringQuiz();

  const classes = [`content`, `quiz-list`];
  adminActive ? classes.push(`monitoring`) : classes;

  return (
    <main className={classes.join(` `)}>
      {
        quizzes.map(q => {
          return <QuizLink key={q.id} {...q} />;
        })
      }
    </main>
  );
};

IndexPage.propTypes = {
  store: PropTypes.observableObject.isRequired
};

export default inject(`store`)(observer(IndexPage));
