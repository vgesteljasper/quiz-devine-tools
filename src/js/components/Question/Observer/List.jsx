import React from 'react';
import {PropTypes} from 'mobx-react';
import {observer} from 'mobx-react';

import Question from './';

const QuestionObserverList = ({questions}) => {
  return (
    <div className='quiz-detail__list'>
      {questions.map(q => <Question key={q.id} {...q} monitorVotes={q.monitorVotes} />)}
    </div>
  );
};

QuestionObserverList.propTypes = {
  questions: PropTypes.observableArray.isRequired
};

export default observer(QuestionObserverList);
