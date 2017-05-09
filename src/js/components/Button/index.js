/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {func, string} from 'prop-types';
import Detail from './Detail';

const Button = ({value, color, method, detail}) => {
  return (
    <button className={`button button_${color}`} onClick={() => method()}>
      {detail !== `` ? <Detail value={detail} /> : null}
      <span>{value}</span>
    </button>
  );
};

Button.propTypes = {
  value: string.isRequired,
  color: string.isRequired,
  method: func.isRequired,
  detail: string
};

Button.defaultProps = {
  detail: ``
};

export default Button;
