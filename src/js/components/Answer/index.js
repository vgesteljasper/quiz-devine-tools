/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {string, func, bool} from 'prop-types';

import Prefix from './Prefix';

const Answer = ({vote, answer, prefix, enabled, voted}) => {
  let classList = `button quiz-detail__answer`;
  classList = voted ? `${classList} button_blue` : classList;
  return (
    <button disabled={enabled ? `` : `disabled`} onClick={vote} className={classList}>
      <Prefix value={prefix} />
      <span>{answer}</span>
    </button>
  );
};

Answer.propTypes = {
  vote: func.isRequired,
  answer: string.isRequired,
  prefix: string.isRequired,
  enabled: bool.isRequired,
  voted: bool.isRequired
};

export default Answer;
