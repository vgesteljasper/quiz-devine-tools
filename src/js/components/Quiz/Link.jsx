import React from 'react';
import {string} from 'prop-types';
import {Link} from 'react-router-dom';

import {toDate} from './../../lib/dateFormat';

const QuizLink = ({id, created, name}) => {

  return (
    <Link className='quiz' to={`/quiz/${id}`}>
      <h2 className='quiz__name'>{name}</h2>
      <span className='quiz__date'>{toDate(created)}</span>
    </Link>
  );
};

QuizLink.propTypes = {
  id: string.isRequired,
  created: string.isRequired,
  name: string.isRequired
};

export default QuizLink;
