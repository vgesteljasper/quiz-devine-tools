import React from 'react';
import {func, string} from 'prop-types';

const Button = ({value, color, method, type}) => {

  const classes = [`button`];
  color !== `` ? classes.push(`button_${color}`) : classes;
  type === `small` ? classes.push(`button_small`) : classes;

  return (
    <button className={classes.join(` `)} onClick={method}>
      <span>{value}</span>
    </button>
  );
};

Button.propTypes = {
  value: string.isRequired,
  method: func.isRequired,
  color: string,
  type: string
};

Button.defaultProps = {
  color: ``,
  type: ``
};

export default Button;
