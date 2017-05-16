import React from 'react';
import {inject, observer, PropTypes} from 'mobx-react';
import {default as swal} from 'sweetalert2';

import Button from './../Button';

const HeaderActions = ({store}) => {

  const {addQuiz, adminActive, toggleAdminActive, stopMonitoringQuiz} = store;

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
      stopMonitoringQuiz();
    }
  };

  return (
    <div className='action-bar action-bar_right'>
      {
        adminActive
        ? <Button value='New Quiz' method={newQuizHandler} />
        : null
      }
      <Button
        value={adminActive ? `Admin (On)` : `Admin (off)`}
        color={adminActive ? `red` : `blue`}
        method={toggleAdminActiveHandler}
      />
    </div>
  );
};

HeaderActions.propTypes = {
  store: PropTypes.observableObject.isRequired
};

export default inject(`store`)(observer(HeaderActions));
