import {observable} from 'mobx';
import Quiz from './../models/Quiz';
import {quizAPI} from './../lib/api/apiHelper';

class Store {

  @observable quizzes = [];

  @observable stagedQuiz = {};
  @observable stagedQuestions = [];
  @observable stagedAnswers = [];

  @observable isCreating = false;
  @observable adminActive = true;

  constructor() {
    quizAPI.get().then(quizzes => this._addQuiz(...quizzes));
  }

  toggleIsEditing = () => {
    this.isCreating = !this.isCreating;
  }

  toggleAdminActive = () => {
    if (!this.adminActive) {
      if (confirm(`We'll assume you're an admin for now 😁\n\nENABLE ADMIN?`)) {
        this.adminActive = true;
      }
    } else {
      this.adminActive = false;

      // NOTE: stop all quizzes from monitoring votes
      this._stopMonitoringVotes();
    }
  }

  _addQuiz(...quizzes) {
    quizzes.forEach(q => {
      this.quizzes.push(
        new Quiz(q._id, q.created, q.name)
      );
    });
  }

  addQuiz = name => {
    quizAPI.insert(name).then(quiz => this._addQuiz(quiz));
  }

  removeQuiz = id => {
    const quiz = this.quizzes.find(q => q.id === id);
    if (quiz) {
      quizAPI.remove(id) // remove quiz from db
        .then(() => { // remove quiz from store
          this.quizzes = this.quizzes.filter(q => q.id !== id);
        });
    }
  }

  _stopMonitoringVotes = () => {
    this.quizzes.forEach(q => {
      q.questions.forEach(q => {
        if (q.setInterval) q.stopMonitoringVotes();
      });
    });
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
