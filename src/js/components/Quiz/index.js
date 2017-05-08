/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {inject, observer, PropTypes} from 'mobx-react';
import {string} from 'prop-types';
import {Link} from 'react-router-dom';

import Title from './Title';
import Created from './Created';
import QuestionList from './QuestionList';

const Quiz = ({store, id}) => {

  const {created, name, questions} = store.quizzes.find(q => q.id === id);

  return (
    <main className='content'>
      <div className='content__top-bar'>
        <Link to='/' className='button button_red'>&lt; Back to overview</Link>
      </div>
      <section className='quiz-detail'>
        <div className='quiz-detail__info'>
          <Title value={name} />
          <Created value={created} />
        </div>
        <QuestionList questions={questions} />
      </section>
    </main>
  );
};

Quiz.propTypes = {
  store: PropTypes.observableObject.isRequired,
  id: string.isRequired
};

export default inject(`store`)(observer(Quiz));
