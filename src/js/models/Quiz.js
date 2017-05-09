import {observable, action} from 'mobx';
import Question from './Question';

export default class Quiz {

  @observable questions = []

  constructor(id, created, modified, name) {
    this.id = id;
    this.created = created;
    this.modified = modified;
    this.name = name;

    fetch(`/api/questions?quizId=${id}&fields=question`)
      .then(response => {
        if (response.status === 200) return response.json();
        return [];
      })
      .then(response => response.questions)
      .then(result => this._addQuestion(...result));
  }

  @action _addQuestion(...questions) {
    questions.forEach(q => {
      this.questions.push(
        new Question(q._id, q.created, q.modified, q.question)
      );
    });
  }

}
