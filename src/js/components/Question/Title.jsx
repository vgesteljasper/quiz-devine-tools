import React from 'react';
import {string} from 'prop-types';

const QuestionTitle = ({value}) => (
  <h3 className='quiz-detail__question'>{value}</h3>
);

QuestionTitle.propTypes = {
  value: string.isRequired
};

export default QuestionTitle;
