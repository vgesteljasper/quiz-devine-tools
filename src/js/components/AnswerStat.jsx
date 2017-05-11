import React from 'react';
import {string, number, bool} from 'prop-types';
import {observer} from 'mobx-react';

import ButtonDetail from './Button/Detail';

const AnswerStat = ({answer, votes, totalVotes, correct, detail}) => {

  const width = `${(votes / totalVotes) * 100}%`;
  const backgroundColor = correct ? `lighrgreen` : `pink`;
  const styles = {width, backgroundColor};

  return (
    <div className='stat'>
      <h5 className='stat__answer'>
        <ButtonDetail value={detail} />
        <span>{answer}</span>
      </h5>
      <span className='stat__votes'>{votes}</span>
      <div className='stat__bar' style={styles}></div>
    </div>
  );
};

AnswerStat.propTypes = {
  answer: string.isRequired,
  votes: number.isRequired,
  totalVotes: number.isRequired,
  correct: bool.isRequired,
  detail: string.isRequired
};

export default observer(AnswerStat);
