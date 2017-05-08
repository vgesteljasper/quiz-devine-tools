/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {string, object} from 'prop-types';

import AnswerList from './AnswerList';

const Question = ({question, answers}) => {
  return (
    <div className='quiz-detail__question-list'>
      <h3 className='quiz-detail__question'>{question}</h3>
      <AnswerList answers={answers} />
    </div>
  );
};

Question.propTypes = {
  question: string.isRequired,
  answers: object.isRequired
};

export default Question;
