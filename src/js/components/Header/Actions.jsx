import React from 'react';
import {inject, observer} from 'mobx-react';
import {func, bool} from 'prop-types';
import {default as swal} from 'sweetalert2';

import Button from './../Button';

const HeaderActions = ({addQuiz, adminActive, toggleAdminActive, stopMonitoringVotes}) => {

  const sharedSettings = {
    showCancelButton: true,
    showLoaderOnConfirm: true
  };

  const newQuizHandler = () => {
    swal({
      title: `New quiz.`,
      text: `What is the name of your new quiz?`,
      input: `text`,
      confirmButtonText: `Create`,
      ...sharedSettings
    })
    .then(name => {
      addQuiz(name)
        .then(() => swal(`Success`, `Quiz has been added.`, `success`))
        .catch(() => swal(`Error`, `Quiz couldn't be created. Please try again.`, `error`));
    })
    .catch(err => console.log(err));
  };

  const toggleAdminActiveHandler = () => {
    if (!adminActive) {
      swal({
        title: `Admin area.`,
        text: `We'll assume you're an admin for now I guess? 😁`,
        confirmButtonText: `Continue`,
        ...sharedSettings
      })
      .then(() => toggleAdminActive())
      .catch(err => console.log(err));
    } else {
      toggleAdminActive();
      stopMonitoringVotes();
    }
  };

  return (
    <div className='action-bar action-bar_right'>
      {adminActive ? <Button value='New Quiz' method={newQuizHandler} /> : null}
      <Button value={adminActive ? `Admin (On)` : `Admin (off)`} color={adminActive ? `red` : `blue`} method={toggleAdminActiveHandler} />
    </div>
  );
};

HeaderActions.propTypes = {
  addQuiz: func.isRequired,
  adminActive: bool.isRequired,
  toggleAdminActive: func.isRequired,
  stopMonitoringVotes: func.isRequired
};

export default inject(({store}) => {
  const {addQuiz, adminActive, toggleAdminActive, stopMonitoringVotes} = store;
  return {addQuiz, adminActive, toggleAdminActive, stopMonitoringVotes};
})(observer(HeaderActions));
