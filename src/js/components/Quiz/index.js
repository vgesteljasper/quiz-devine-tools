/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {observer, PropTypes} from 'mobx-react';
import {string} from 'prop-types';

import {toDate} from './../../lib/dateFormat';
import Question from './../Question';

const Quiz = ({quiz, type}) => {

  const {created, name, questions, loadQuestions} = quiz;
  loadQuestions();

  return (
    <section className='quiz'>
      <div className='quiz__info'>
        <h2 className='quiz__title'>{name}</h2>
        <h3 className='quiz__date'>{toDate(created)}</h3>
      </div>
      <div className='question-list'>
        {questions.map(q => <Question key={q.id} quest={q} type={type} />)}
      </div>
    </section>
  );
};

Quiz.propTypes = {
  quiz: PropTypes.observableObject.isRequired,
  type: string.isRequired
};

export default observer(Quiz);
