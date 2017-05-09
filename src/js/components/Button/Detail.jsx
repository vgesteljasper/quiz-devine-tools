import React from 'react';
import {string} from 'prop-types';

const ButtonDetail = ({value}) => (
  <span className='button__detail'>{value}</span>
);

ButtonDetail.propTypes = {
  value: string.isRequired
};

export default ButtonDetail;
