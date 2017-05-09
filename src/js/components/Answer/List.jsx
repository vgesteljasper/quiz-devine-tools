import React from 'react';
import {object} from 'prop-types';
import {observer} from 'mobx-react';

import Answer from './';

const AnswerList = ({answers}) => {
  const letters = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`];
  return (
    <div className='quiz-detail__answer-list'>
      {answers.map((a, i) => <Answer key={a.id} vote={a.vote} detail={`${letters[i]}.`} {...a} />)}
    </div>
  );
};

AnswerList.propTypes = {
  answers: object.isRequired
};

export default observer(AnswerList);
