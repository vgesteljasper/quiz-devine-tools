import React from 'react';
import {string} from 'prop-types';

const AnswerStatTitle = ({value}) => <h3>{value}</h3>;

AnswerStatTitle.propTypes = {
  value: string.isRequired
};

export default AnswerStatTitle;
