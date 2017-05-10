import React, {Component} from 'react';
import {observer, inject, PropTypes} from 'mobx-react';
import {string, object} from 'prop-types';
import {Redirect} from 'react-router-dom';

import Quiz from './../components/Quiz/';
import Link from './../components/Link';

@inject(`store`) @observer
class QuizPage extends Component {

  state = {}
  quiz = this.props.store.quizzes.find(q => q.id === this.props.id);

  componentWillUnmount() {
    // NOTE: We need a handler here to stop the refreshInterval when leaving this route.
    // NOTE: = reason for using state component
    if (this.quiz) {
      this.quiz.questions.forEach(q => {
        q.stopMonitoringVotes();
      });
    }
  }

  render() {
    if (this.quiz) {
      return (
        <main className='content'>
          {
            /* if set adminActive to true but still on /quiz/:id, redirect ro /quiz/observer/:id */
            this.props.store.adminActive && this.props.match.path === `/quiz/:id`
              ? <Redirect to={`/quiz/observer/${this.props.id}`} />
              : null
          }
          {
            /* if set adminActive to false but still on /quiz/observer/:id, redirect ro /quiz/:id */
            !this.props.store.adminActive && this.props.match.path === `/quiz/observer/:id`
              ? <Redirect to={`/quiz/${this.props.id}`} />
              : null
          }
          <div className='action-bar'>
            <Link to='/' value='Back to overview' detail='&#10094;' color='red' />
          </div>
          <Quiz type={this.props.type} quiz={this.quiz} />
        </main>
      );
    } else {
      return <Redirect to='/' />;
    }
  }
}

QuizPage.propTypes = {
  id: string.isRequired,
  type: string.isRequired,
  match: object.isRequired
};

QuizPage.wrappedComponent.propTypes = {
  store: PropTypes.observableObject.isRequired
};

export default QuizPage;
