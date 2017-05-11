import React from 'react';
import {inject, observer} from 'mobx-react';
import {func, bool} from 'prop-types';
import Button from './../Button/';

const Actions = ({toggleIsEditing, adminActive, toggleAdminActive}) => (
  <div className='header__buttons'>
    {adminActive ? <Button value='New Quiz' color='blue' method={toggleIsEditing} /> : null}
    <Button value={adminActive ? `Admin (On)` : `Admin (off)`} color={adminActive ? `red` : `blue`} method={toggleAdminActive} />
  </div>
);

Actions.propTypes = {
  toggleIsEditing: func.isRequired,
  adminActive: bool.isRequired,
  toggleAdminActive: func.isRequired
};

export default inject(({store}) => {
  const {toggleIsEditing, adminActive, toggleAdminActive} = store;
  return {toggleIsEditing, adminActive, toggleAdminActive};
})(observer(Actions));
