import {observable, action} from 'mobx';
import Quiz from './../models/Quiz';
import {quizAPI} from './../lib/api/apiHelper';

class Store {

  constructor() {

    // fetch quizzes
    quizAPI.get().then(quizzes => this._addQuiz(...quizzes));
  }

  @action _addQuiz(...quizzes) {
    quizzes.forEach(q => {
      this.quizzes.push(
        new Quiz(q._id, q.created, q.name, this.refreshInterval)
      );
    });
  }

  @observable quizzes = [];

  @observable stagedQuiz = {};
  @observable stagedQuestions = [];
  @observable stagedAnswers = [];

  @observable isCreating = false;
  @observable adminActive = false;

  @action toggleIsEditing = () => {
    this.isCreating = !this.isCreating;
  }

  @action toggleMonitoring = () => {
    if (!this.adminActive) {
      if (confirm(`We'll assume you're an admin for now 😁

ENABLE ADMIN?`)) {
        this.adminActive = true;
      }
    } else {
      this.adminActive = false;
    }
  }

  @action addNewQuiz = name => {
    quizAPI.insert(name).then(quiz => this._addQuiz(quiz));
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
