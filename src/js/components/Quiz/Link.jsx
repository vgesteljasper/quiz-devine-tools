import React from 'react';
import {string, bool} from 'prop-types';
import {inject} from 'mobx-react';
import {Link} from 'react-router-dom';

import {toDate} from './../../lib/dateFormat';

const QuizLink = ({id, created, name, adminActive}) => {

  const target = adminActive
    ? `/quiz/observer/${id}`
    : `/quiz/${id}`;

  return (
    <Link className='quiz-link' to={target}>
      <h2 className='quiz-link__name'>{name}</h2>
      <h3 className='quiz-link__date'>{toDate(created)}</h3>
    </Link>
  );
};

QuizLink.propTypes = {
  id: string.isRequired,
  created: string.isRequired,
  name: string.isRequired,
  adminActive: bool.isRequired
};

export default inject(({store}) => {
  return {adminActive: store.adminActive};
})(QuizLink);
