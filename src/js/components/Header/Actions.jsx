import React from 'react';
import {inject, observer} from 'mobx-react';
import {func, bool} from 'prop-types';
import Button from './../Button/';

const Actions = ({toggleIsEditing, adminActive, toggleMonitoring}) => (
  <div className='header__buttons'>
    {adminActive ? <Button value='New Quiz' color='blue' method={toggleIsEditing} /> : null}
    <Button value={adminActive ? `Admin (On)` : `Admin (off)`} color={adminActive ? `red` : `blue`} method={toggleMonitoring} />
  </div>
);

Actions.propTypes = {
  toggleIsEditing: func.isRequired,
  adminActive: bool.isRequired,
  toggleMonitoring: func.isRequired
};

export default inject(({store}) => {
  const {toggleIsEditing, adminActive, toggleMonitoring} = store;
  return {toggleIsEditing, adminActive, toggleMonitoring};
})(observer(Actions));
