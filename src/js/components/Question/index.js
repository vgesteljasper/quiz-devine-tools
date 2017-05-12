/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {object, bool, func} from 'prop-types';
import {inject, observer} from 'mobx-react';

import AnswerButton from './../Answer/Button';
import AnswerStat from './../Answer/Stat';
import QuestionActions from './Actions';

const Question = ({question: quest, removeQuestion, adminActive}) => {

  const {id, question, answers, totalVotes, startMonitoringVotes, removeAnswer, addAnswer} = quest;
  const letters = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`];

  const classes = [`answer-list`];

  if (adminActive) {
    startMonitoringVotes();
    classes.push(`answer-list_observer`);
  } else {
    classes.push(`answer-list_responder`);
  }

  return (
    <div className='question'>
      <div className='question__top'>
        <h4 className='question__name'>{question}</h4>
        {adminActive ? <QuestionActions id={id} question={question} removeQuestion={removeQuestion} addAnswer={addAnswer} /> : null}
      </div>
      <div className={classes.join(` `)}>
        {
          adminActive
            ? answers.map((a, i) => <AnswerStat key={a.id} answer={a} removeAnswer={removeAnswer} totalVotes={totalVotes} detail={`${letters[i]}.`} />)
            : answers.map((a, i) => <AnswerButton key={a.id} {...a} vote={a.vote} detail={`${letters[i]}.`} />)
        }
      </div>
    </div>
  );
};

Question.propTypes = {
  question: object.isRequired,
  removeQuestion: func.isRequired,
  adminActive: bool.isRequired
};

export default inject(({store}) => {
  const {adminActive} = store;
  return {adminActive};
})(observer(Question));
