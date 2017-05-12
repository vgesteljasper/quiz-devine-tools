import {observable} from 'mobx';
import Quiz from './../models/Quiz';
import {quizAPI} from './../lib/api/apiHelper';

class Store {

  @observable quizzes = [];

  @observable stagedQuiz = {};
  @observable stagedQuestions = [];
  @observable stagedAnswers = [];

  @observable adminActive = true;

  constructor() {
    quizAPI.get().then(quizzes => this._addQuiz(...quizzes));
  }

  _addQuiz(...quizzes) {
    quizzes.forEach(q => {
      this.quizzes.push(
        new Quiz(q._id, q.created, q.name)
      );
    });
  }

  addQuiz = name => {
    return quizAPI.insert(name)
      .then(quiz => this._addQuiz(quiz));
  }

  removeQuiz = id => {
    return quizAPI.remove(id) // remove quiz from db
      .then(() => { // remove quiz from store
        this.quizzes = this.quizzes.filter(q => q.id !== id);
      });
  }

  stopMonitoringVotes = () => {
    console.log(`stop monitoring`);
    this.quizzes.forEach(q => {
      q.questions.forEach(q => q.stopMonitoringVotes());
    });
  }

  toggleAdminActive = () => {
    this.adminActive = !this.adminActive;
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
