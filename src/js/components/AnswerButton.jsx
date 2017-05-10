import React from 'react';
import {string, func, bool} from 'prop-types';

import ButtonDetail from './Button/Detail';

const AnswerButton = ({vote, answer, detail, enabled, voted}) => {

  const classes = [`button`, `answer`];
  voted ? classes.push(`button_blue`) : classes;

  return (
    <button disabled={enabled ? `` : `disabled`} onClick={vote} className={classes.join(` `)}>
      <ButtonDetail value={detail} />
      <span>{answer}</span>
    </button>
  );
};

AnswerButton.propTypes = {
  vote: func.isRequired,
  answer: string.isRequired,
  detail: string.isRequired,
  enabled: bool.isRequired,
  voted: bool.isRequired
};

export default AnswerButton;
