import React from 'react';
import {Link} from 'react-router-dom';

const Title = () => {
  return (
    <Link to='/' className='header__title'>
      <h1>Devine Tools Quiz</h1>
    </Link>
  );
};

export default Title;
