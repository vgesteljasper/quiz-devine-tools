/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {inject, observer, PropTypes} from 'mobx-react';
import {string} from 'prop-types';
import {Redirect} from 'react-router-dom';

import Title from './Title';
import Created from './Created';
import QuestionList from './../Question/List';
import QuestionListObserver from './../Question/Observer/List';
import Link from './../Link';

const Quiz = ({store, id, type}) => {

  const quiz = store.quizzes.find(q => q.id === id);

  if (quiz) {
    const {created, name, questions} = quiz;
    return (
      <main className='content'>
        <div className='content__top-bar'>
          <Link to='/' value='Back to overview' detail='&#10094;' color='red' />
        </div>
        <section className='quiz-detail'>
          <div className='quiz-detail__info'>
            <Title value={name} />
            <Created value={created} />
          </div>
          {
            type === `responder`
              ? <QuestionList questions={questions} />
              : <QuestionListObserver questions={questions} />
          }
        </section>
      </main>
    );
  } else {
    return <Redirect to='/' />;
  }
};

Quiz.propTypes = {
  store: PropTypes.observableObject.isRequired,
  id: string.isRequired,
  type: string.isRequired
};

export default inject(`store`)(observer(Quiz));
