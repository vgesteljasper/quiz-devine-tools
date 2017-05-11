import {observable} from 'mobx';
import Question from './Question';
import {questionAPI} from './../lib/api/apiHelper';

export default class Quiz {

  @observable questions = []
  loaded = false

  constructor(id, created, name) {
    this.id = id;
    this.created = created;
    this.name = name;
  }

  addQuestion = question => {
    return questionAPI.insert(this.id, question)
      .then(question => {
        this._addQuestion(question);
      });
  }

  removeQuestion = id => {
    const question = this.questions.find(q => q.id === id);
    if (question) {
      console.log(`remove question`);
    }
  }

  loadQuestions = () => {
    if (!this.loaded) {
      questionAPI.get(this.id).then(questions => this._addQuestion(...questions));
      this.loaded = true;
    }
  }

  _addQuestion(...questions) {
    questions.forEach(q => {
      this.questions.push(
        new Question(q._id, q.question, this.adminActive)
      );
    });
  }

}
