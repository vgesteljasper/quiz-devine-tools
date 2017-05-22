import React from 'react';
import {object} from 'prop-types';
import {inject, PropTypes} from 'mobx-react';
import {default as swal} from 'sweetalert2';

import ActionIconButton from './../ActionIconButton';

const QuestionActions = ({question: quest, store, modal}) => {

  const sharedSettings = {
    showCancelButton: true,
    showLoaderOnConfirm: true
  };

  const alertOptions = {
    title: `New Answer`,
    text: `What is the answer?`,
    type: `html`
  };

  const {id, question} = quest;
  const {removeQuestion, addAnswer, editQuestion} = store;

  const deleteQuestionHandler = () => {
    swal({
      title: `Delete Question`,
      text: `Are you sure you want to delete this question?`,
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
    modal.popAlert(alertOptions)
      .then(answer => {
        swal({
          title: `New Answer.`,
          text: `Is the answer correct?`,
          input: `select`,
          inputOptions: {false: `No`, true: `Yes`},
          confirmButtonText: `Create`,
          ...sharedSettings
        }).then(correct => {
          addAnswer(id, answer, correct)
            .catch(() => swal(`Error`, `Answer couldn't be created. Please try again.`, `error`));
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
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
      <ActionIconButton type='new-answer' title='New Answer' color='transparent' method={addAnswerHandler} />
      <ActionIconButton type='edit' title='Edit Question' color='transparent' method={editQuestionHandler} />
      <ActionIconButton type='delete' title='Delete Question' color='transparent' method={deleteQuestionHandler} />
    </div>
  );

};

QuestionActions.propTypes = {
  question: object.isRequired,
  store: PropTypes.observableObject.isRequired,
  modal: PropTypes.observableObject.isRequired
};

export default inject(({store, modal}) => {
  return {store, modal};
})(QuestionActions);
