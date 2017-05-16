import React from 'react';
import {object} from 'prop-types';
import {inject, PropTypes} from 'mobx-react';
import {default as swal} from 'sweetalert2';

import ActionIconButton from './../ActionIconButton';

const QuestionActions = ({question: quest, store}) => {

  const sharedSettings = {
    showCancelButton: true,
    showLoaderOnConfirm: true
  };

  const {id, question} = quest;
  const {removeQuestion, addAnswer, editQuestion} = store;

  const deleteQuestionHandler = () => {
    swal({
      title: `Are you sure you want to delete this question?`,
      text: question,
      confirmButtonText: `Delete`,
      confirmButtonColor: `#f82831`,
      ...sharedSettings
    })
    .then(() => {
      removeQuestion(id)
        .catch(() => swal(`Error`, `Question couldn't be deleted. Please try again.`, `error`));
    })
    .catch(err => console.log(err));
  };

  const addAnswerHandler = () => {
    swal.setDefaults({
      title: `New answer.`,
      ...sharedSettings
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
      addAnswer(id, ...result)
        .catch(() => swal(`Error`, `Answer couldn't be created. Please try again.`, `error`));
    }, () => swal.resetDefaults());
  };

  const editQuestionHandler = () => {
    swal({
      title: `Edit Question.`,
      text: `What is the new question?`,
      input: `text`,
      inputValue: question,
      confirmButtonText: `Update`,
      ...sharedSettings
    }).then(question => {
      editQuestion(id, question)
        .catch(() => swal(`Error`, `Question couldn't be updated. Please try again.`, `error`));
    })
    .catch(err => console.log(err));
  };

  return (
    <div className='action-bar action-bar_quiz action-bar_right'>
      <ActionIconButton type='new-answer' title='New Answer' method={addAnswerHandler} />
      <ActionIconButton type='edit' title='Edit Question' method={editQuestionHandler} />
      <ActionIconButton type='delete' title='Delete Question' method={deleteQuestionHandler} />
    </div>
  );

};

QuestionActions.propTypes = {
  question: object.isRequired,
  store: PropTypes.observableObject.isRequired
};

export default inject(`store`)(QuestionActions);
