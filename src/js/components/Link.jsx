import React from 'react';
import {string} from 'prop-types';
import {Link} from 'react-router-dom';
import ButtonDetail from './Button/Detail';

const LinkButton = ({to, value, color, detail}) => (
  <Link className={`button button_${color}`} to={to}>
    {detail !== `` ? <ButtonDetail value={detail} /> : null}
    <span>{value}</span>
  </Link>
);

LinkButton.propTypes = {
  to: string.isRequired,
  value: string.isRequired,
  color: string.isRequired,
  detail: string
};

LinkButton.defaultProps = {
  detail: ``
};

export default LinkButton;
