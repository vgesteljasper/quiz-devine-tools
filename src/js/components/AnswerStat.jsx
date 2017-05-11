import React from 'react';
import {string, number, bool} from 'prop-types';
import {observer} from 'mobx-react';

const AnswerStat = ({answer, votes, totalVotes, correct}) => {

  const width = `${(votes / totalVotes) * 100}%`;
  const backgroundColor = correct ? `lighrgreen` : `pink`;
  const styles = {width, backgroundColor};

  return (
    <div className='stat'>
      <span className='stat__answer'>{answer}</span>
      <span className='stat__votes'>{votes}</span>
      <div className='stat__bar' style={styles}></div>
    </div>
  );
};

AnswerStat.propTypes = {
  answer: string.isRequired,
  votes: number.isRequired,
  totalVotes: number.isRequired,
  correct: bool.isRequired
};

export default observer(AnswerStat);
