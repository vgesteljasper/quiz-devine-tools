import React from 'react';
import {object} from 'prop-types';

import Question from './../Question/';

const QuestionList = ({questions}) => {
  return (
    <div className='quiz-detail__list'>
      {questions.map(q => <Question key={q.id} {...q} />)}
    </div>
  );
};

QuestionList.propTypes = {
  questions: object.isRequired
};

export default QuestionList;
