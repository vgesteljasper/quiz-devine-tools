/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {inject, observer, PropTypes} from 'mobx-react';
import {object} from 'prop-types';

import {toDate} from './../../lib/dateFormat';
import Question from './../Question/';
import QuizActions from './Actions';

const Quiz = ({quiz, store}) => {

  const {id, name, created, published} = quiz;
  const {adminActive, questions, startMonitoringQuiz, stopMonitoringQuiz} = store;

  const filteredQuestions = questions.filter(q => q.quizId === id);

  if (adminActive && published) startMonitoringQuiz(id);
  else stopMonitoringQuiz();

  return (
    <section className='quiz'>
      <div className='top-bar'>
        <div className='quiz__info'>
          <h2 className='quiz__title'>{name}</h2>
          <h3 className='quiz__date'>{toDate(created)}</h3>
        </div>
        {
          adminActive
            ? <QuizActions quiz={quiz} />
            : null
        }
      </div>
      <div className='question-list'>
        {
          published || adminActive
            ? filteredQuestions.map(q => <Question key={q.id} question={q} />) // show questions if client is admin and or if quiz is live
            : <h4>Quiz is not published yet.</h4> // show message if not admin and or not live
        }
      </div>
    </section>
  );
};

Quiz.propTypes = {
  quiz: object.isRequired,
  store: PropTypes.observableObject.isRequired
};

export default inject(`store`)(observer(Quiz));
