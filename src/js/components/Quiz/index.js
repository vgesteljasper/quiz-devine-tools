/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {string} from 'prop-types';

import {toDate} from './../../lib/dateFormat';

const Quiz = ({created, name}) => {

  return (
    <div className='quiz'>
      <h2 className='quiz__name'>{name}</h2>
      <span className='quiz__date'>{toDate(created)}</span>
    </div>
  );
};

Quiz.propTypes = {
  created: string.isRequired,
  name: string.isRequired
};

export default Quiz;
