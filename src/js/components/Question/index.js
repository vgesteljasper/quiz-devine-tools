/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {string, object} from 'prop-types';

import AnswerList from './../Answer/List';
import Title from './Title';

const Question = ({question, answers}) => {
  return (
    <div className='quiz-detail__question-list'>
      <Title value={question} />
      <AnswerList answers={answers} />
    </div>
  );
};

Question.propTypes = {
  question: string.isRequired,
  answers: object.isRequired
};

export default Question;
