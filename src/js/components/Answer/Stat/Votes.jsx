import React from 'react';
import {number} from 'prop-types';

const AnswerStatVotes = ({value}) => <span>{value}</span>;

AnswerStatVotes.propTypes = {
  value: number.isRequired
};

export default AnswerStatVotes;
