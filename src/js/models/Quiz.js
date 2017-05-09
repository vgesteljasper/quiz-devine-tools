import {observable, action} from 'mobx';
import Question from './Question';

export default class Quiz {

  @observable questions = []

  constructor(id, created, modified, name) {
    this.id = id;
    this.created = created;
    this.modified = modified;
    this.name = name;

    fetch(`/api/question/${id}`)
      .then(response => {
        if (response.status === 200) return response.json();
        return [];
      })
      .then(result => this._addQuestion(...result));
  }

  @action _addQuestion(...questions) {
    questions.forEach(q => {
      this.questions.push(
        new Question(q.id, q.created, q.modified, q.question)
      );
    });
  }

}
