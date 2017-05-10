/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {object, string, func} from 'prop-types';
import {observer} from 'mobx-react';

import AnswerStatList from './../../Answer/Stat/List';
import Title from './../Title';

const QuestionObserver = ({question, answers, monitorVotes}) => {

  // monitorVotes();
  console.log(monitorVotes);

  return (
    <div className='quiz-detail__question-list'>
      <Title value={question} />
      <AnswerStatList answers={answers} />
    </div>
  );
};

QuestionObserver.propTypes = {
  question: string.isRequired,
  answers: object.isRequired,
  monitorVotes: func.isRequired
};

export default observer(QuestionObserver);
