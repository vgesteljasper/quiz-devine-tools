import {observable, action} from 'mobx';
import Quiz from './../models/Quiz';
import Question from './../models/Question';
import Answer from './../models/Answer';
import {quizAPI, questionAPI, answerAPI, voteAPI} from './../lib/api/apiHelper';

class Store {

  @observable quizzes = [];
  @observable questions = [];
  @observable answers = [];

  @observable adminActive = true;

  monitorInterval = 0

  constructor() {
    this._loadQuizzes()
      .then(() => this._loadQuestions())
      .then(() => this._loadAnswers())
      .catch(err => console.log(err));
  }

  // *************************************************************************** QUIZ
  // ***************************************************************************
  // ***************************************************************************

  _loadQuizzes = () => { // get from API
    return quizAPI.get()
      .then(quizzes => this._addQuiz(...quizzes));
  }

  _addQuiz = (...quizzes) => { // to store
    quizzes.forEach(q => {
      this.quizzes.push(
        new Quiz(q._id, q.created, q.name, q.published)
      );
    });
  }

  @action removeQuiz = quizId => { // remove from API and update store
    return quizAPI.remove(quizId)
      .then(() => {
        this.quizzes = this.quizzes.filter(q => q.id !== quizId);
      });
  }

  @action addQuiz = name => { // create new with API and add to store
    quizAPI.insert(name)
      .then(q => this._addQuiz(q));
  }

  @action editQuiz = (quizId, name) => { // update with API and update in store
    return quizAPI.update(quizId, name)
      .then(() => {
        const quiz = this.quizzes.find(q => q.id === quizId);
        quiz.name = name;
      });
  }

  @action togglePublished = quizId => {
    const quiz = this.quizzes.find(q => q.id === quizId);

    return quizAPI.togglePublished(quizId, !quiz.published) // update with API
      .then(() => quiz.togglePublished()); // udpate in store
  }

  // *************************************************************************** QUESTION
  // ***************************************************************************
  // ***************************************************************************

  _loadQuestions = () => { // get from API
    return questionAPI.get()
      .then(questions => this._addQuestion(...questions));
  }

  _addQuestion = (...questions) => { // to store
    questions.forEach(q => {
      this.questions.push(
        new Question(q._id, q.quizId, q.question)
      );
    });
  }

  @action removeQuestion = questionId => { // remove from API and update store
    return questionAPI.remove(questionId)
      .then(() => {
        this.questions = this.questions.filter(q => q.id !== questionId);
      });
  }

  @action addQuestion = (quizId, question) => { // create new with API and add to store
    return questionAPI.insert(quizId, question)
      .then(q => this._addQuestion(q));
  }

  @action editQuestion = (id, question) => { // update with API and update in store
    return questionAPI.update(id, question)
      .then(() => {
        const q = this.questions.find(q => q.id === id);
        q.question = question;
      });
  }

  // *************************************************************************** ANSWER
  // ***************************************************************************
  // ***************************************************************************

  _loadAnswers = () => { // get from API
    return answerAPI.get()
      .then(answers => this._addAnswer(...answers))
      .then(() => this._calculateTotalVotes());
  }

  _addAnswer = (...answers) => { // to store
    answers.forEach(a => {
      this.answers.push(
        new Answer(a._id, a.questionId, a.answer, a.correct, a.votes)
      );
    });
  }

  @action removeAnswer = answerId => { // remove from API and update store
    return answerAPI.remove(answerId)
      .then(() => {
        this.answers = this.answers.filter(a => a.id !== answerId);
      });
  }

  @action addAnswer = (questionId, answer, correct) => { // create new with API and add to store
    return answerAPI.insert(questionId, answer, correct)
      .then(a => this._addAnswer(a));
  }

  @action voteAnswer = (answerId, questionId) => {
    const answer = this.answers.find(a => a.id === answerId);
    const question = this.questions.find(q => q.id === questionId);

    answerAPI.vote(answerId) // add vote in API
      .then(a => answer.votes = a.votes) // add vote to store
      .then(() => answer.toggleVoted()) // tell answer it voted
      .then(() => question.toggleEnabled()); // disable questions
  }

  // *************************************************************************** GENERAL
  // ***************************************************************************
  // ***************************************************************************

  _calculateTotalVotes = () => {
    this.questions.forEach(q => q.totalVotes = 0); // clear totalVotes
    this.answers.forEach(a => { // calculate totalVotes
      const question = this.questions.find(q => q.id === a.questionId);
      if (question) question.totalVotes += a.votes;
    });
  }

  @action toggleAdminActive = () => {
    this.adminActive = !this.adminActive;
  }

  @action startMonitoringQuiz = quizId => {
    if (this.monitorInterval === 0) {
      this._startMonitoringQuiz(quizId);
    } else {
      this.stopMonitoringQuiz();
      this._startMonitoringQuiz(quizId);
    }
  }

  @action stopMonitoringQuiz = () => {
    console.log(`stopping interval`);
    clearInterval(this.monitorInterval);
    this.monitorInterval = 0;
  }

  _startMonitoringQuiz = quizId => {
    console.log(`starting interval: ${quizId}`);
    this.monitorInterval = setInterval(() => {
      this._monitor(quizId);
    }, 2000);
  }

  _monitor = quizId => {
    const questions = this.questions.filter(q => q.quizId === quizId);
    questions.forEach(q => {
      voteAPI.get(q.id)
        .then(answers => this._updateVotes(...answers))
        .then(() => this._calculateTotalVotes());
    });
  }

  _updateVotes = (...answers) => {
    answers.forEach(answr => {
      const answer = this.answers.find(a => a.id === answr._id);
      answer.votes = answr.votes;
    });
  }

}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
