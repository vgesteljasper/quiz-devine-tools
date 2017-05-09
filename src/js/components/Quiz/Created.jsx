import React from 'react';
import {string} from 'prop-types';
import {toDate} from './../../lib/dateFormat';

const QuizCreated = ({value}) => <span className='quiz-detail__date'>{toDate(value)}</span>;

QuizCreated.propTypes = {
  value: string.isRequired
};

export default QuizCreated;
