import {observable, action} from 'mobx';
import Answer from './Answer';

export default class Question {

  @observable answers = []
  @observable question = ``

  constructor(id, created, modified, question) {
    this.id = id;
    this.created = created;
    this.modified = modified;
    this.question = question;

    fetch(`/api/answers?questionId=${id}&fields=answer,votes&sort=created`)
      .then(response => {
        if (response.status !== 200) return [];
        return response.json();
      })
      .then(response => response.answers)
      .then(result => this._addAnswer(...result));
  }

  @action monitorVotes = () => {
    setInterval(this._getVotes, 5000);
  }

  @action _getVotes = () => {
    fetch(`/api/answers?questionId=${this.id}&fields=votes`)
      .then(response => {
        if (response.status !== 200) throw new Error();
        return response.json();
      })
      .then(response => response.answers)
      .then(answers => this._updateVotes(...answers));
  }

  @action _updateVotes = (...answers) => {
    answers.forEach((a, i) => {
      this.answers[i]._pushVotes(a.votes);
    });
  }

  @action disablaAnswers = () => {
    this.answers.forEach(a => a._disable());
  }

  @action _addAnswer(...answers) {
    answers.forEach(a => {
      this.answers.push(
        new Answer(a._id, a.created, a.modified, a.answer, a.correct, a.votes, this.disablaAnswers)
      );
    });
  }

}
