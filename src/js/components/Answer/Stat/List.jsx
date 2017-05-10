import React from 'react';
import {object} from 'prop-types';

import Stat from './';

const AnswerStatList = ({answers}) => {

  return (
    <div>
      {answers.map(a => <Stat key={a.id} answer={a} />)}
    </div>
  );

};

AnswerStatList.propTypes = {
  answers: object.isRequired
};

export default AnswerStatList;
