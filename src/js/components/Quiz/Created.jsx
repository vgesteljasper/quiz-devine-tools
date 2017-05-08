import React from 'react';
import {string} from 'prop-types';
import {toDate} from './../../lib/dateFormat';

const Created = ({value}) => <span className='quiz-detail__date'>{toDate(value)}</span>;

Created.propTypes = {
  value: string.isRequired
};

export default Created;
