import React from 'react';
import {inject, observer} from 'mobx-react';
import {object} from 'prop-types';

import Quiz from './Quiz/';

const Quizzes = ({quizzes}) => {

  return (
    <main className='quizzes'>
      {quizzes.map(q => <Quiz key={q.id} {...q} />)}
    </main>
  );
};

Quizzes.propTypes = {
  quizzes: object.isRequired
};

export default inject(({store}) => {
  return {quizzes: store.quizzes};
})(observer(Quizzes));
