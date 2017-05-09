import {observable, action} from 'mobx';
import Answer from './Answer';

export default class Question {

  @observable answers = [];

  constructor(id, created, modified, question) {
    this.id = id;
    this.created = created;
    this.modified = modified;
    this.question = question;

    fetch(`/api/answer/${id}`)
      .then(response => {
        if (response.status === 200) return response.json();
        return [];
      })
      .then(result => this._addAnswer(...result));
  }

  @action disablaAnswers = () => {
    this.answers.forEach(a => a._disable());
  }

  @action _addAnswer(...answers) {
    answers.forEach(a => {
      this.answers.push(
        new Answer(a.id, a.created, a.modified, a.answer, a.correct, this.disablaAnswers)
      );
    });
  }

}
