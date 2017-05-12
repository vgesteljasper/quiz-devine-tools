import {observable} from 'mobx';
import Answer from './Answer';
import {voteAPI, answerAPI} from './../lib/api/apiHelper';

export default class Question {

  @observable answers = []
  @observable question = ``
  @observable totalVotes = 0

  refreshInterval = 0
  statusInterval = 0
  loaded = false

  constructor(id, question) {
    this.id = id;
    this.question = question;

    answerAPI.get(this.id)
      .then(answers => this._addAnswer(...answers))
      .then(() => this.loaded = true);
  }

  addAnswer = (answer, correct) => {
    return answerAPI.insert(this.id, answer, correct)
      .then(answer => this._addAnswer(answer));
  }

  removeAnswer = id => {
    return answerAPI.remove(id) // remove answer from db
      .then(() => { // remove answer from store
        this.answers = this.answers.filter(a => a.id !== id);
      });
  }

  startMonitoringVotes = () => {
    if (!this.loaded) { // if answers not loaded yet, start monitoring for this and start after they are loaded
      this._startStatusInterval();
    } else { // start if answers are loaded
      this._startMonitorInterval();
    }
  }

  _startStatusInterval = () => {
    if (this.statusInterval === 0) { // set interval for checking if answers are loaded
      this.statusInterval = setInterval(this._checkStatus, 100);
    }
  }

  _checkStatus = () => {
    if (this.loaded) { // if answers are loaded
      if (this.statusInterval !== 0) { // stop this func from executing
        clearInterval(this.statusInterval);
        this.statusInterval = 0;
      }
      // start monitoring votes
      this._startMonitorInterval();
    }
  }

  _startMonitorInterval = () => {
    if (this.refreshInterval === 0) {
      this._getVotes(); // get votes
      this.refreshInterval = setInterval(this._getVotes, 2000); // set interval for getting votes
    }
  }

  stopMonitoringVotes = () => { // stop interval for monitoring
    if (this.refreshInterval !== 0) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = 0;
    }
  }

  _getVotes = () => { // fetch votes for all answers
    voteAPI.get(this.id).then(votes => {
      this._updateVotes(...votes);
    });
  }

  _updateVotes = (...answers) => {
    let totalVotes = 0; // calculate total votes
    answers.forEach((answer, iteration) => {
      totalVotes += Number(answer.votes);
      this.answers[iteration]._pushVotes(answer.votes); // push new votes to correct Answer instance
    });
    this.totalVotes = totalVotes;
  }

  disablaAnswers = () => {
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
