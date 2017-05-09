import React from 'react';
import {toYear} from './../lib/dateFormat';

const Footer = () => {

  return (
    <footer className='footer'>
      <span>Copyright &copy; {toYear(new Date())} Van Gestel Jasper</span>
    </footer>
  );
};

export default Footer;
