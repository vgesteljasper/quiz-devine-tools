import React from 'react';
import {func, string} from 'prop-types';
import {default as swal} from 'sweetalert2';

import Button from './../Button';
import DeleteButton from './../DeleteButton';

const QuestionActions = ({id, question, removeQuestion, addAnswer}) => {

  const deleteQuestionHandler = () => {
    swal({
      title: `Are you sure you want to delete this question?`,
      text: question,
      confirmButtonText: `Delete`,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: `#f82831`
    })
    .then(() => {
      removeQuestion(id)
        .then(() => swal(`Success`, `Question has been deleted.`, `success`))
        .catch(() => swal(`Error`, `Question couldn't be deleted. Please try again.`, `error`));
    })
    .catch(err => console.log(err));
  };

  const addAnswerHandler = () => {
    swal.setDefaults({
      title: `New answer.`,
      showCancelButton: true
    });
    const steps = [
      {
        input: `text`,
        text: `What is the answer?`,
        confirmButtonText: `Next`
      },
      {
        input: `select`,
        text: `Is the answer correct?`,
        inputOptions: {false: `No`, true: `Yes`},
        confirmButtonText: `Create`,
      }
    ];
    swal.queue(steps).then(result => {
      swal.resetDefaults();
      addAnswer(...result)
        .then(() => swal(`Success`, `Answer has been added.`, `success`))
        .catch(() => swal(`Error`, `Answer couldn't be created. Please try again.`, `error`));
    }, () => swal.resetDefaults());
  };

  return (
    <div className='action-bar action-bar_right'>
      <Button value='Add Answer' type='small' method={addAnswerHandler} />
      <DeleteButton method={deleteQuestionHandler} />
    </div>
  );

};

QuestionActions.propTypes = {
  id: string.isRequired,
  question: string.isRequired,
  removeQuestion: func.isRequired,
  addAnswer: func.isRequired
};

export default QuestionActions;
