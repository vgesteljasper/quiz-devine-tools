/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {inject, observer, PropTypes} from 'mobx-react';
import {bool, string, func} from 'prop-types';

import {toDate} from './../../lib/dateFormat';
import Question from './../Question/';
import QuizActions from './Actions';

const Quiz = ({id, isLive, toggleLive, addQuestion, editQuestion, created, name, questions, loadQuestions, removeQuestion, adminActive}) => {

  loadQuestions();

  return (
    <section className='quiz'>
      <div className='top-bar'>
        <div className='quiz__info'>
          <h2 className='quiz__title'>{name}</h2>
          <h3 className='quiz__date'>{toDate(created)}</h3>
        </div>
        {
          adminActive
            ? <QuizActions id={id} name={name} isLive={isLive} toggleLive={toggleLive} addQuestion={addQuestion} />
            : null
        }
      </div>
      <div className='question-list'>
        {
          isLive || adminActive // show questions if client is admin and or if quiz is live
            ? questions.map(q => <Question key={q.id} isLive={isLive} removeQuestion={removeQuestion} question={q} editQuestion={editQuestion} />)
            : <h4>Quiz is not published yet.</h4> // show message if not admin and or not live
        }
      </div>
    </section>
  );
};

Quiz.propTypes = {
  id: string.isRequired,
  isLive: bool.isRequired,
  toggleLive: func.isRequired,
  addQuestion: func.isRequired,
  editQuestion: func.isRequired,
  created: string.isRequired,
  name: string.isRequired,
  questions: PropTypes.observableArray.isRequired,
  loadQuestions: func.isRequired,
  removeQuestion: func.isRequired,
  adminActive: bool.isRequired
};

export default inject(({store}) => {
  return {adminActive: store.adminActive};
})(observer(Quiz));
