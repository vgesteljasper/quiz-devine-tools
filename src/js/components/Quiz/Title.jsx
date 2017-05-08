import React from 'react';
import {string} from 'prop-types';

const Title = ({value}) => <h2 className='quiz-detail__title'>{value}</h2>;

Title.propTypes = {
  value: string.isRequired
};

export default Title;
