import React from 'react';
import {object} from 'prop-types';
import {observer} from 'mobx-react';

import Answer from './../Answer/';

const AnswerList = ({answers}) => {
  const alphabet = [
    `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`, `l`, `m`,
    `n`, `o`, `p`, `q`, `r`, `s`, `t`, `u`, `v`, `w`, `x`, `y`, `z`
  ];
  return (
    <div className='quiz-detail__answer-list'>
      {answers.map((a, i) => <Answer key={a.id} vote={a.vote} prefix={alphabet[i]} {...a} />)}
    </div>
  );
};

AnswerList.propTypes = {
  answers: object.isRequired
};

export default observer(AnswerList);
