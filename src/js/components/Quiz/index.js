/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {inject, observer, PropTypes} from 'mobx-react';
import {bool} from 'prop-types';

import {toDate} from './../../lib/dateFormat';
import Question from './../Question';
import QuizActions from './Actions';

const Quiz = ({quiz, adminActive}) => {

  const {created, name, questions, loadQuestions} = quiz;
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
            ? <QuizActions quiz={quiz} />
            : null
        }
      </div>
      <div className='question-list'>
        {questions.map(q => <Question key={q.id} question={q} />)}
      </div>
    </section>
  );
};

Quiz.propTypes = {
  quiz: PropTypes.observableObject.isRequired,
  adminActive: bool.isRequired
};

export default inject(({store}) => {
  return {adminActive: store.adminActive};
})(observer(Quiz));
