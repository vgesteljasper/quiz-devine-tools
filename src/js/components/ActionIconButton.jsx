import React from 'react';
import {func, string} from 'prop-types';

import EditIcon from './Icon/EditIcon';
import DeleteIcon from './Icon/DeleteIcon';
import NewAnswerIcon from './Icon/NewAnswerIcon';
import NewQuestionIcon from './Icon/NewQuestionIcon';

const ActionIconButton = ({type, method, title, color}) => {

  const classes = [`button`, `button_small`];
  type === `delete` ? classes.push(`button_delete`) : classes.push(`button_edit`);
  color === `` ? null : classes.push(`button_${color}`);

  return (
    <button onClick={method} className={classes.join(` `)} title={title}>
      {type === `delete` ? <DeleteIcon /> : null}
      {type === `edit` ? <EditIcon /> : null}
      {type === `new-answer` ? <NewAnswerIcon /> : null}
      {type === `new-question` ? <NewQuestionIcon /> : null}
    </button>
  );

};

ActionIconButton.propTypes = {
  type: string.isRequired,
  method: func.isRequired,
  title: string.isRequired,
  color: string
};

ActionIconButton.defaultProps = {
  color: ``
};

export default ActionIconButton;
