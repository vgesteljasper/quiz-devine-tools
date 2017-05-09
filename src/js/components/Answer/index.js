/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {string, func, bool} from 'prop-types';

import ButtonDetail from './../Button/Detail';

const Answer = ({vote, answer, detail, enabled, voted}) => {
  return (
    <button
      disabled={enabled ? `` : `disabled`}
      onClick={vote}
      className={`button quiz-detail__answer ${voted ? `button_blue` : ``}`}
    >
      <ButtonDetail value={detail} />
      <span>{answer}</span>
    </button>
  );
};

Answer.propTypes = {
  vote: func.isRequired,
  answer: string.isRequired,
  detail: string.isRequired,
  enabled: bool.isRequired,
  voted: bool.isRequired
};

export default Answer;
