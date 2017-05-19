/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {object} from 'prop-types';
import {inject, observer, PropTypes} from 'mobx-react';

import AnswerButton from './../Answer/Button';
import AnswerStat from './../Answer/Stat';
import QuestionActions from './Actions';

const Question = ({question: quest, store}) => {

  const {id, question, isPublished, enabled, totalVotes} = quest;
  const {adminActive, answers, startMonitoringQuiz} = store;
  const filteredAnswers = answers.filter(a => a.questionId === id);

  const letters = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`];

  const questionClasses = [`question`];
  const answerListClasses = [`answer-list`];

  if (adminActive) {
    questionClasses.push(`question_observer`);
    answerListClasses.push(`answer-list_observer`);
  } else {
    questionClasses.push(`question_responder`);
    answerListClasses.push(`answer-list_responder`);
  }

  if (adminActive && isPublished) startMonitoringQuiz();

  return (
    <div className={questionClasses.join(` `)}>
      <div className='question__top'>
        <h4 className='question__name' dangerouslySetInnerHTML={{__html: question}}></h4>
        {adminActive ? <QuestionActions question={quest} /> : null}
      </div>
      <div className={answerListClasses.join(` `)}>
        {
          adminActive
            ? filteredAnswers.map((a, i) => {
              return <AnswerStat key={a.id} answer={a} detail={`${letters[i]}.`} totalVotes={totalVotes} />;
            })
            : filteredAnswers.map((a, i) => {
              return (<AnswerButton key={a.id} question={quest} answer={a}
              enabled={enabled} detail={`${letters[i]}.`} />);
            })
        }
      </div>
    </div>
  );
};

Question.propTypes = {
  question: object.isRequired,
  store: PropTypes.observableObject.isRequired
};

export default inject(`store`)(observer(Question));
