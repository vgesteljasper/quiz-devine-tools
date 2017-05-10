import React from 'react';
import {object, string} from 'prop-types';
import {observer} from 'mobx-react';

import AnswerButton from './AnswerButton';
import AnswerStat from './AnswerStat';

const Question = ({quest, type}) => {

  const {question, answers, loadAnswers, startMonitoringVotes} = quest;
  const letters = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`];

  loadAnswers();

  if (type === `observer`) {
    startMonitoringVotes();
  }

  return (
    <div className='question'>
      <h4 className='question__name'>{question}</h4>
      <div className='answer-list'>
        {
          type === `responder`
            ? answers.map((a, i) => <AnswerButton key={a.id} {...a} vote={a.vote} detail={`${letters[i]}.`} />)
            : answers.map(a => <AnswerStat key={a.id} {...a} />)
        }
      </div>
    </div>
  );
};

Question.propTypes = {
  quest: object.isRequired,
  type: string.isRequired
};

export default observer(Question);
