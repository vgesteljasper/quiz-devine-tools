import {observable, action} from 'mobx';

export default class Answer {

  @observable enabled = true
  @observable voted = false

  constructor(id, created, modified, answer, correct, disableAnswers) {
    this.id = id;
    this.created = created;
    this.modified = modified;
    this.answer = answer;
    this.correct = correct;
    this.disableAnswers = disableAnswers;
  }

  @action vote = () => {
    this.voted = true;
    this.disableAnswers();
  }

  @action _disable = () => {
    this.enabled = false;
  }

}
