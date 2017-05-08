/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Title from './Title';
import Actions from './Actions';
import DevineLogo from './../DevineLogo';

const Header = () => (
  <header className='header'>
    <div className='header__content width-limit'>
      <div className='header__left'>
        <DevineLogo />
        <Title />
      </div>
      <Actions />
    </div>
  </header>
);

export default Header;
