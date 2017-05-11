import React from 'react';
import {object, bool} from 'prop-types';
import {inject, observer} from 'mobx-react';

import AnswerButton from './AnswerButton';
import AnswerStat from './AnswerStat';

const Question = ({question: quest, adminActive}) => {

  const {question, answers, totalVotes, startMonitoringVotes} = quest;
  const letters = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`];

  const classes = [`answer-list`, `responder`];

  if (adminActive) {
    startMonitoringVotes();
    classes.pop();
    classes.push(`observer`);
  }

  return (
    <div className='question'>
      <h4 className='question__name'>{question}</h4>
      <div className={classes.join(` `)}>
        {
          adminActive
            ? answers.map((a, i) => <AnswerStat key={a.id} {...a} totalVotes={totalVotes} detail={`${letters[i]}.`} />)
            : answers.map((a, i) => <AnswerButton key={a.id} {...a} vote={a.vote} detail={`${letters[i]}.`} />)
        }
      </div>
    </div>
  );
};

Question.propTypes = {
  question: object.isRequired,
  adminActive: bool.isRequired
};

export default inject(({store}) => {
  return {adminActive: store.adminActive};
})(observer(Question));
