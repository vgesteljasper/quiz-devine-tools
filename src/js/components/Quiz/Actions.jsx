import React from 'react';
import {inject, observer, PropTypes} from 'mobx-react';
import {object} from 'prop-types';
import {default as swal} from 'sweetalert2';

import Button from './../Button';
import ActionIconButton from './../ActionIconButton';
import LiveReloading from './../Icon/LiveReloading';

const QuizActions = ({quiz, store, modal}) => {

  const {id, name, published} = quiz;
  const {removeQuiz, editQuiz, togglePublished, addQuestion, adminActive, stopMonitoringQuiz} = store;
  const {popAlert} = modal;

  const sharedSettings = {
    showCancelButton: true,
    showLoaderOnConfirm: true
  };

  const alertOptions = {
    title: `New Question`,
    text: `What is the question?`,
    type: `html`
  };

  const togglePublishedHandler = () => {
    swal({
      title: published ? `Unpublish this quiz?` : `Publish this quiz?`,
      text: name,
      confirmButtonText: published ? `Unpublish` : `Publish`,
      confirmButtonColor: published ? `#f82831` : `#3085d6`,
      ...sharedSettings
    })
    .then(() => {
      togglePublished(id)
        .catch(() => swal(`Error`, `Error toggling quiz published. Please try again.`, `error`));
    })
    .catch(err => console.log(err));
  };

  const deleteQuizHandler = () => {
    swal({
      title: `Are you sure you want to delete this quiz?`,
      text: name,
      confirmButtonText: `Delete`,
      confirmButtonColor: `#f82831`,
      ...sharedSettings
    })
    .then(() => {
      removeQuiz(id)
        .then(() => stopMonitoringQuiz())
        .catch(() => swal(`Error`, `Quiz couldn't be deleted. Please try again.`, `error`));
    })
    .catch(err => console.log(err));
  };

  const addQuestionHandler = () => {
    // use draft-js to insert html for question
    popAlert({...alertOptions, continueButtonText: `Create`})
      .then(question => {
        addQuestion(id, question)
          .catch(() => swal(`Error`, `Question couldn't be created. Please try again.`, `error`));
      })
      .catch(err => console.log(err));
  };

  const editQuizHandler = () => {
    swal({
      title: `Edit Quiz.`,
      text: `What is the new name?`,
      input: `text`,
      inputValue: name,
      confirmButtonText: `Update`,
      ...sharedSettings
    }).then(name => {
      editQuiz(id, name)
        .catch(() => swal(`Error`, `Quiz couldn't be updated. Please try again.`, `error`));
    })
    .catch(err => console.log(err));
  };

  return (
    <div className='action-bar action-bar_right'>
      {
        adminActive && published
          ? <LiveReloading />
          : null
      }
      <Button value={published ? `Unpublish Quiz` : `Publish Quiz`} type='small' color={published ? `red` : `blue`} method={togglePublishedHandler} />
      <ActionIconButton title='New Question' type='new-question' method={addQuestionHandler} />
      <ActionIconButton title='Edit Quiz Name' type='edit' method={editQuizHandler} />
      <ActionIconButton title='Delete Quiz' type='delete' method={deleteQuizHandler} />
    </div>
  );

};

QuizActions.propTypes = {
  quiz: object.isRequired,
  store: PropTypes.observableObject.isRequired,
  modal: PropTypes.observableObject.isRequired
};

export default inject(({store, modal}) => {
  return {store, modal};
})(observer(QuizActions));
