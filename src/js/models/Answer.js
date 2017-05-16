import {action, observable} from 'mobx';

export default class Answer {

  @observable voted = false

  constructor(id, questionId, answer, correct, votes) {
    this.id = id;
    this.questionId = questionId;
    this.answer = answer;
    this.correct = correct;
    this.votes = votes;
  }

  @action toggleVoted = () => {
    this.voted = !this.voted;
  }

}
