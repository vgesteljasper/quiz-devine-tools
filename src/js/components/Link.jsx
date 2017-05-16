import React from 'react';
import {string} from 'prop-types';
import {Link} from 'react-router-dom';

const LinkButton = ({to, value, color}) => {

  return (
    <Link to={to} className={`button button_${color}`}>
      <span>{value}</span>
    </Link>
  );

};

LinkButton.propTypes = {
  to: string.isRequired,
  value: string.isRequired,
  color: string.isRequired
};

export default LinkButton;
