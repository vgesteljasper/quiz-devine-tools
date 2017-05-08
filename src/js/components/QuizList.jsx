import React from 'react';
import {inject, observer} from 'mobx-react';
import {object} from 'prop-types';

import QuizLink from './QuizLink';

const QuizList = ({quizzes}) => {

  return (
    <main className='content'>
      <section className='quiz-list'>
        {quizzes.map(q => <QuizLink key={q.id} {...q} />)}
      </section>
    </main>
  );
};

QuizList.propTypes = {
  quizzes: object.isRequired
};

export default inject(({store}) => {
  return {quizzes: store.quizzes};
})(observer(QuizList));
