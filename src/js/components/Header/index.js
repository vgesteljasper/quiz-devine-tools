/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Actions from './Actions';
import DevineLogo from './../Icon/DevineLogo';
import {Link} from 'react-router-dom';

const Header = () => (
  <header className='header'>
    <div className='header__content'>
      <div className='header__left'>
        <DevineLogo />
        <Link to='/' className='header__title'>
          <h1>Devine Tools Quiz</h1>
        </Link>
      </div>
      <Actions />
    </div>
  </header>
);

export default Header;
