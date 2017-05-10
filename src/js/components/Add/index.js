/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {inject, observer} from 'mobx-react';
import {func} from 'prop-types';
import Button from './../Button/';

const Add = ({toggleIsEditing, addNewQuiz}) => {

  let $quizName;

  const preventReload = evt => evt.preventDefault();

  const _addNewQuiz = () => {
    const name = $quizName.value;
    if (name.length > 0) {
      addNewQuiz($quizName.value);
    }
  };

  return (
    <section className='new-quiz'>
      <div className='new-quiz__content'>
        <div className='action-bar action-bar_right'>
          <Button value='Close' color='red' method={toggleIsEditing} />
        </div>
        <form onSubmit={preventReload}>
          <h2>New Quiz</h2>
          <input type='text' ref={el => $quizName = el} />
          <Button value='Add' color='blue' method={_addNewQuiz} />
        </form>
      </div>
    </section>
  );
};

Add.propTypes = {
  toggleIsEditing: func.isRequired,
  addNewQuiz: func.isRequired
};

export default inject(({store}) => {
  const {toggleIsEditing, addNewQuiz} = store;
  return {toggleIsEditing, addNewQuiz};
})(observer(Add));
