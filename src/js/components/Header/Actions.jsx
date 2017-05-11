import React from 'react';
import {inject, observer} from 'mobx-react';
import {func, bool} from 'prop-types';
import Button from './../Button/';

const HeaderActions = ({toggleIsEditing, adminActive, toggleAdminActive}) => (
  <div className='action-bar action-bar_right'>
    {adminActive ? <Button value='New Quiz' method={toggleIsEditing} /> : null}
    <Button value={adminActive ? `Admin (On)` : `Admin (off)`} color={adminActive ? `red` : `blue`} method={toggleAdminActive} />
  </div>
);

HeaderActions.propTypes = {
  toggleIsEditing: func.isRequired,
  adminActive: bool.isRequired,
  toggleAdminActive: func.isRequired
};

export default inject(({store}) => {
  const {toggleIsEditing, adminActive, toggleAdminActive} = store;
  return {toggleIsEditing, adminActive, toggleAdminActive};
})(observer(HeaderActions));
