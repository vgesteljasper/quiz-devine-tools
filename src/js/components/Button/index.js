/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {func, string} from 'prop-types';
import Detail from './Detail';

const Button = ({value, color, method, detail}) => {

  const classes = [`button`];
  color !== `` ? classes.push(`button_${color}`) : classes;

  return (
    <button className={classes.join(` `)} onClick={() => method()}>
      {detail !== `` ? <Detail value={detail} /> : null}
      <span>{value}</span>
    </button>
  );
};

Button.propTypes = {
  value: string.isRequired,
  method: func.isRequired,
  detail: string,
  color: string
};

Button.defaultProps = {
  detail: ``,
  color: ``
};

export default Button;
