import React from 'react';
import {object} from 'prop-types';

import Answer from './../Answer/';

const AnswerList = ({answers}) => {
  return (
    <div className='quiz-detail__answer-list'>
      {answers.map(a => <Answer key={a.id} {...a} />)}
    </div>
  );
};

AnswerList.propTypes = {
  answers: object.isRequired
};

export default AnswerList;
