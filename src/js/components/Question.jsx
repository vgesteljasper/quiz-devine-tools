import React from 'react';
import {object, string} from 'prop-types';
import {observer} from 'mobx-react';

import AnswerButton from './AnswerButton';
import AnswerStat from './AnswerStat';

const Question = ({question: quest, type}) => {

  const {question, answers, loadAnswers, startMonitoringVotes, totalVotes} = quest;
  const letters = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`];

  loadAnswers();

  const classes = [`answer-list`, `responder`];

  if (type === `observer`) {
    startMonitoringVotes();
    classes.pop();
    classes.push(`observer`);
  }

  return (
    <div className='question'>
      <h4 className='question__name'>{question}</h4>
      <div className={classes.join(` `)}>
        {
          type === `responder`
            ? answers.map((a, i) => <AnswerButton key={a.id} {...a} vote={a.vote} detail={`${letters[i]}.`} />)
            : answers.map(a => <AnswerStat key={a.id} {...a} totalVotes={totalVotes} />)
        }
      </div>
    </div>
  );
};

Question.propTypes = {
  question: object.isRequired,
  type: string.isRequired
};

export default observer(Question);
