import React from 'react';
import {func, string} from 'prop-types';

import EditIcon from './Icon/EditIcon';
import DeleteIcon from './Icon/DeleteIcon';

const ActionIconButton = ({type, method, title}) => {

  const classes = [`button`, `button_small`];
  type === `delete` ? classes.push(`button_delete`) : classes.push(`button_edit`);

  return (
    <button onClick={method} className={classes.join(` `)} title={title}>
      {
        type === `delete`
          ? <DeleteIcon />
          : <EditIcon />
      }
    </button>
  );

};

ActionIconButton.propTypes = {
  type: string.isRequired,
  method: func.isRequired,
  title: string.isRequired
};

export default ActionIconButton;
