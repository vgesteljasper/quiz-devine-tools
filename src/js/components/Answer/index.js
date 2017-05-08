/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {string, bool} from 'prop-types';

const Answer = ({answer, correct}) => {
  return <button className='button quiz-detail__answer'>{answer} {correct}</button>;
};

Answer.propTypes = {
  answer: string.isRequired,
  correct: bool.isRequired
};

export default Answer;
