import React from 'react';
import {string, number} from 'prop-types';
import {observer} from 'mobx-react';

const AnswerStat = ({answer, votes}) => {
  return (
    <div className='stat'>
      <span>{answer}</span>
      <span>{votes}</span>
    </div>
  );
};

AnswerStat.propTypes = {
  answer: string.isRequired,
  votes: number.isRequired
};

export default observer(AnswerStat);
