import React from 'react';
import {inject, observer} from 'mobx-react';
import {func} from 'prop-types';
import Button from './../Button';

const Actions = ({toggleIsEditing}) => (
  <div className='header__buttons'>
    <Button classes={[`button_blue`]} value='New Quiz' method={toggleIsEditing} />
  </div>
);

Actions.propTypes = {
  toggleIsEditing: func.isRequired
};

export default inject(({store}) => {
  return {toggleIsEditing: store.toggleIsEditing};
})(observer(Actions));
