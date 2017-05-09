import {observable, action} from 'mobx';
import Quiz from './../models/Quiz';

class Store {

  constructor() {
    fetch(`/api/quizzes?fields=name,created&sort=-modified`)
      .then(response => {
        if (response.status === 200) return response.json();
        return [];
      })
      .then(result => result.quizzes)
      .then(results => this._addQuiz(...results));
  }

  @action _addQuiz(...quizzes) {
    quizzes.forEach(q => {
      this.quizzes.push(
        new Quiz(q._id, q.created, q.modified, q.name)
      );
    });
  }

  @observable quizzes = [];

  @observable unstagedQuezzes = [];
  @observable unstagedQuestions = [];
  @observable unstagedAnswers = [];

  @observable isCreating = false;

  @action toggleIsEditing = () => {
    this.isCreating = !this.isCreating;
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
