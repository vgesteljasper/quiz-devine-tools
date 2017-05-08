import React from 'react';
import {string} from 'prop-types';
import {observer, inject, PropTypes} from 'mobx-react';

import Add from './../components/Add/';
import Quiz from './../components/Quiz/';

const QuizPage = ({store, id}) => (
  <div className='quizpage-content'>
    <Quiz id={id} />
    {store.isCreating ? <Add /> : null}
  </div>
);

QuizPage.propTypes = {
  store: PropTypes.observableObject.isRequired,
  id: string.isRequired
};

export default inject(`store`)(observer(QuizPage));
