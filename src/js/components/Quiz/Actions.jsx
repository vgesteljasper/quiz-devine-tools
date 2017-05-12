import React from 'react';
import {inject, observer, PropTypes} from 'mobx-react';
import {func} from 'prop-types';
import {default as swal} from 'sweetalert2';

import Button from './../Button';
import DeleteButton from './../DeleteButton';

const QuizActions = ({quiz, removeQuiz}) => {

  const {id, name, addQuestion, isLive, toggleLive} = quiz;

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
      .then(() => swal(`Success`, `Quiz has been deleted.`, `success`))
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
        .then(() => swal(`Success`, `Question has been added.`, `success`))
        .catch(() => swal(`Error`, `Question couldn't be created. Please try again.`, `error`));
    })
    .catch(err => console.log(err));
  };

  return (
    <div className='action-bar action-bar_right'>
      <Button value={isLive ? `Unpublish Quiz` : `Publish Quiz`} type='small' color={isLive ? `red` : `blue`} method={toggleLiveHandler} />
      <Button value='Add Question' type='small' method={addQuestionHandler} />
      <DeleteButton method={deleteQuizHandler} />
    </div>
  );

};

QuizActions.propTypes = {
  quiz: PropTypes.observableObject.isRequired,
  removeQuiz: func.isRequired
};

export default inject(({store}) => {
  return {removeQuiz: store.removeQuiz};
})(observer(QuizActions));
