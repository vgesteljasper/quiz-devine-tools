import React from 'react';
import {observer, inject, PropTypes} from 'mobx-react';
import {string, object, bool} from 'prop-types';
import {Redirect} from 'react-router-dom';

import Quiz from './../components/Quiz/';
import Link from './../components/Link';


const QuizPage = ({type, match, adminActive, quizzes}) => {

  const {path} = match;
  const {id} = match.params;
  const quiz = quizzes.find(q => q.id === id);

  if (quiz) {
    return (
      <main className='content'>
        {
          /* if set adminActive to true but still on /quiz/:id, redirect ro /quiz/observer/:id */
          adminActive && path === `/quiz/:id`
            ? <Redirect to={`/quiz/observer/${id}`} />
            : null
        }
        {
          /* if set adminActive to false but still on /quiz/observer/:id, redirect ro /quiz/:id */
          !adminActive && path === `/quiz/observer/:id`
            ? <Redirect to={`/quiz/${id}`} />
            : null
        }
        <div className='action-bar'>
          <Link to='/' value='Back to overview' detail='&#10094;' color='red' />
        </div>
        <Quiz type={type} quiz={quiz} />
      </main>
    );
  } else {
    return <Redirect to='/' />;
  }

};

QuizPage.propTypes = {
  adminActive: bool.isRequired,
  quizzes: PropTypes.observableArray.isRequired,
  match: object.isRequired,
  type: string.isRequired
};

export default inject(({store}) => {
  const {adminActive, quizzes} = store;
  return {adminActive, quizzes};
})(observer(QuizPage));
