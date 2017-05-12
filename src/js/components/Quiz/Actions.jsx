import React from 'react';
import {inject, PropTypes} from 'mobx-react';
import {func} from 'prop-types';
import {default as swal} from 'sweetalert2';

import Button from './../Button';
import DeleteButton from './../DeleteButton';

const QuizActions = ({quiz, removeQuiz}) => {

  const {id, name, addQuestion} = quiz;

  const removeQuizHandler = () => {
    swal({
      title: name,
      text: `Are you sure you want to delete this quiz?`,
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
      <Button value='Add Question' color='green' method={addQuestionHandler} />
      <DeleteButton method={removeQuizHandler} />
    </div>
  );

};

QuizActions.propTypes = {
  quiz: PropTypes.observableObject.isRequired,
  removeQuiz: func.isRequired
};

export default inject(({store}) => {
  return {removeQuiz: store.removeQuiz};
})(QuizActions);
