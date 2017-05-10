/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {object} from 'prop-types';
import {observer} from 'mobx-react';

import AnswerStatTitle from './Title';
import AnswerStatVotes from './Votes';

const AnswerStat = ({answer}) => {
  const {answer: answr, votes} = answer;
  return (
    <div className='stat'>
      <AnswerStatTitle value={answr} />
      <AnswerStatVotes value={votes} />
    </div>
  );

};

AnswerStat.propTypes = {
  answer: object.isRequired
};

export default observer(AnswerStat);
