import React from 'react';
import {inject, observer} from 'mobx-react';
import {func} from 'prop-types';
import Button from './../Button/';

const Actions = ({toggleIsEditing}) => (
  <div className='header__buttons'>
    <Button value='New Quiz' color='red' detail='+' method={toggleIsEditing} />
  </div>
);

Actions.propTypes = {
  toggleIsEditing: func.isRequired
};

export default inject(({store}) => {
  return {toggleIsEditing: store.toggleIsEditing};
})(observer(Actions));
