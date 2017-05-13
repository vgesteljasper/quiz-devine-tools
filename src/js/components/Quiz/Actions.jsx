import React from 'react';
import {inject, observer} from 'mobx-react';
import {func, string, bool} from 'prop-types';
import {default as swal} from 'sweetalert2';

import Button from './../Button';
import ActionIconButton from './../ActionIconButton';
import LiveReloading from './../Icon/LiveReloading';

const QuizActions = ({id, name, isLive, toggleLive, addQuestion, removeQuiz, editQuiz}) => {

  const toggleLiveHandler = () => {
    swal({
      title: isLive ? `Unpublish this quiz?` : `Publish this quiz?`,
      text: name,
      confirmButtonText: isLive ? `Unpublish` : `Publish`,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: isLive ? `#f82831` : `#3085d6`
    })
    .then(() => {
      toggleLive()
      .then(() => swal(`Success`, `${isLive ? `Quiz is unpublished` : `Quiz is published`}`, `success`))
      .catch(() => swal(`Error`, `Quiz couldn't be made live. Please try again.`, `error`));
    })
    .catch(err => console.log(err));
  };

  const deleteQuizHandler = () => {
    swal({
      title: `Are you sure you want to delete this quiz?`,
      text: name,
      confirmButtonText: `Delete`,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: `#f82831`
    })
    .then(() => {
      removeQuiz(id)
      // .then(() => swal(`Success`, `Quiz has been deleted.`, `success`))
      .catch(() => swal(`Error`, `Quiz couldn't be deleted. Please try again.`, `error`));
    })
    .catch(err => console.log(err));
  };

  const addQuestionHandler = () => {
    swal({
      title: `New question.`,
      text: `What is the question?`,
      input: `text`,
      confirmButtonText: `Create`,
      showCancelButton: true,
      showLoaderOnConfirm: true
    }).then(name => {
      addQuestion(name)
        // .then(() => swal(`Success`, `Question has been added.`, `success`))
        .catch(() => swal(`Error`, `Question couldn't be created. Please try again.`, `error`));
    })
    .catch(err => console.log(err));
  };

  const editQuizHandler = () => {
    swal({
      title: `Edit Quiz.`,
      text: `What is the new name?`,
      input: `text`,
      confirmButtonText: `Update`,
      showCancelButton: true,
      showLoaderOnConfirm: true
    }).then(name => {
      editQuiz(id, name)
        // .then(() => swal(`Success`, `Quiz has been updated.`, `success`))
        .catch(() => swal(`Error`, `Quiz couldn't be updated. Please try again.`, `error`));
    })
    .catch(err => console.log(err));
  };

  return (
    <div className='action-bar action-bar_right'>
      {isLive ? <LiveReloading /> : null}
      <Button value={isLive ? `Unpublish Quiz` : `Publish Quiz`} type='small' color={isLive ? `red` : `blue`} method={toggleLiveHandler} />
      <Button value='Add Question' type='small' method={addQuestionHandler} />
      <ActionIconButton type='edit' method={editQuizHandler} title='Edit Quiz Name' />
      <ActionIconButton type='delete' method={deleteQuizHandler} title='Delete Quiz' />
    </div>
  );

};

QuizActions.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  isLive: bool.isRequired,
  toggleLive: func.isRequired,
  addQuestion: func.isRequired,
  removeQuiz: func.isRequired,
  editQuiz: func.isRequired
};

export default inject(({store}) => {
  return {removeQuiz: store.removeQuiz, editQuiz: store.editQuiz};
})(observer(QuizActions));
