import React from 'react';
import {string} from 'prop-types';

const QuizTitle = ({value}) => (
  <h2 className='quiz-detail__title'>{value}</h2>
);

QuizTitle.propTypes = {
  value: string.isRequired
};

export default QuizTitle;
