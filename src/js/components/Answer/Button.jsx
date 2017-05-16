import React from 'react';
import {inject, PropTypes} from 'mobx-react';
import {object, string, bool} from 'prop-types';

import Detail from './../Detail';

const AnswerButton = ({answer: answr, question: quest, enabled, detail, store}) => {

  const {id: answerId, answer, voted} = answr;
  const {id: questionId} = quest;
  const {voteAnswer} = store;

  const classes = [`button`, `answer`];
  voted ? classes.push(`button_dark`) : classes;

  const voteAnswerHandler = () => voteAnswer(answerId, questionId);

  return (
    <button
      disabled={enabled ? `` : `disabled`}
      onClick={voteAnswerHandler}
      className={classes.join(` `)}
    >
      <Detail value={detail} />
      <span>{answer}</span>
    </button>
  );
};

AnswerButton.propTypes = {
  answer: object.isRequired,
  question: object.isRequired,
  enabled: bool.isRequired,
  detail: string.isRequired,
  store: PropTypes.observableObject.isRequired
};

export default inject(`store`)(AnswerButton);
