import {observable, action} from 'mobx';
import {voteAPI} from './../lib/api/apiHelper';

export default class Answer {

  @observable enabled = true
  @observable voted = false
  @observable votes = 0

  constructor(id, created, answer, correct, votes, _disableAnswers) {
    this.id = id;
    this.created = created;
    this.answer = answer;
    this.correct = correct;
    this.votes = votes;
    this._disableAnswers = _disableAnswers;
  }

  @action vote = () => {
    this.voted = true;
    this._disableAnswers();
    this._voteUp();
  }

  @action _voteUp = () => {
    voteAPI.voteUp(this.id);
  }

  @action _pushVotes = votes => {
    this.votes = votes;
  }

  @action _disable = () => {
    this.enabled = false;
  }

}
