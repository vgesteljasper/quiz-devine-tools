import {observable} from 'mobx';
import Question from './Question';
import {questionAPI, quizAPI} from './../lib/api/apiHelper';

export default class Quiz {

  @observable questions = []
  @observable isLive = false
  @observable name = ``

  loaded = false

  constructor(id, created, name, isLive) {
    this.id = id;
    this.created = created;
    this.name = name;
    this.isLive = isLive;
  }

  addQuestion = question => {
    return questionAPI.insert(this.id, question)
      .then(question => {
        this._addQuestion(question);
      });
  }

  removeQuestion = id => {
    return questionAPI.remove(id)
      .then(() => {
        this.questions = this.questions.filter(q => q.id !== id);
      });
  }

  editQuestion = (id, quest) => {
    return questionAPI.update(id, quest)
      .then(() => {
        const question = this.questions.find(q => q.id === id);
        question.question = quest;
      });
  }

  loadQuestions = () => {
    if (!this.loaded) {
      questionAPI.get(this.id).then(questions => this._addQuestion(...questions));
      this.loaded = true;
    }
  }

  toggleLive = () => {
    return quizAPI.toggleLive(this.id, !this.isLive) // toggle in db
      .then(() => {
        this.isLive = !this.isLive; // toggle in quiz object if succeeded
      });
  }

  _addQuestion(...questions) {
    questions.forEach(q => {
      this.questions.push(
        new Question(q._id, q.question, this.adminActive)
      );
    });
  }

}
