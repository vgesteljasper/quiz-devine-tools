import {observable, action} from 'mobx';
import Answer from './Answer';
import {voteAPI, answerAPI} from './../lib/api/apiHelper';

export default class Question {

  @observable answers = []
  @observable question = ``
  loaded = false
  setInterval = false

  constructor(id, question) {
    this.id = id;
    this.question = question;
  }

  loadAnswers = () => {
    if (!this.loaded) {
      answerAPI.get(this.id).then(answers => this._addAnswer(...answers));
      this.loaded = true;
    }
  }

  @action startMonitoringVotes = () => {
    if (!this.setInterval) {
      // this.refreshInterval = setInterval(this._getVotes, 2000);
      this.setInterval = true;
    }
  }

  @action stopMonitoringVotes = () => {
    clearInterval(this.refreshInterval);
    this.setInterval = false;
  }

  _getVotes = () => {

    // fetch votes for all answers
    voteAPI.get(this.id).then(votes => {
      this._updateVotes(...votes);
    });
  }

  _updateVotes = (...answers) => {
    answers.forEach((answer, iteration) => {
      this.answers[iteration]._pushVotes(answer.votes);
    });
  }

  @action disablaAnswers = () => {
    this.answers.forEach(a => a._disable());
  }

  _addAnswer(...answers) {
    answers.forEach(a => {
      this.answers.push(
        new Answer(a._id, a.created, a.answer, a.correct, a.votes, this.disablaAnswers)
      );
    });
  }

}
