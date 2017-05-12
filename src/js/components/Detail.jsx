import React from 'react';
import {string} from 'prop-types';

const Detail = ({value}) => (
  <span className='button__detail'>{value}</span>
);

Detail.propTypes = {
  value: string.isRequired
};

export default Detail;
