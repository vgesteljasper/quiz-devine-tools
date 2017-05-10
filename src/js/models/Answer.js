import {observable, action} from 'mobx';

export default class Answer {

  @observable enabled = true
  @observable voted = false
  @observable votes = 0

  constructor(id, created, modified, answer, correct, votes, disableAnswers) {
    this.id = id;
    this.created = created;
    this.modified = modified;
    this.answer = answer;
    this.correct = correct;
    this.votes = votes;
    this.disableAnswers = disableAnswers;
  }

  @action vote = () => {
    this.voted = true;
    this.disableAnswers();
    this._voteUp();
  }

  @action _voteUp = () => {
  }

  @action _pushVotes = votes => {
    this.votes = votes;
    console.log(`updated votes ${votes} ${this.votes}`);
  }

  @action _disable = () => {
    this.enabled = false;
  }

}
