import React from 'react';
import {inject, PropTypes} from 'mobx-react';
import {func} from 'prop-types';

import Button from './../Button/';

const QuizActions = ({quiz, removeQuiz}) => {

  const {id, addQuestion} = quiz;

  const addQuestionHandler = () => {
    const question = prompt(`New Question for \'${name}\'.\nQuestion name?`);
    addQuestion(question)
      .then(() => alert(`Question Added!`));
  };

  const removeQuizHandler = () => {
    removeQuiz(id);
  };

  return (
    <div className='action-bar action-bar_right'>
      <Button value='Remove Quiz' color='red' method={removeQuizHandler} />
      <Button value='Add Question' color='green' method={addQuestionHandler} />
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
