import React from 'react';
import {array, func, string} from 'prop-types';

const Button = ({classes, value, method}) => {
  const classNames = `button ${classes.join(` `)}`;
  return <button className={classNames} onClick={() => method()}>{value}</button>;
};

Button.propTypes = {
  classes: array.isRequired,
  value: string.isRequired,
  method: func.isRequired
};

export default Button;
