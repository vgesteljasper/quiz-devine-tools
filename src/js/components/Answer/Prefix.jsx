import React from 'react';
import {string} from 'prop-types';

const Prefix = ({value}) => <span className='prefix'>{value.toUpperCase()}.  </span>;

Prefix.propTypes = {
  value: string.isRequired
};

export default Prefix;
