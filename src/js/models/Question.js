import {observable, action} from 'mobx';

export default class Question {

  @observable enabled = true;
  @observable question = ``
  @observable totalVotes = 0

  constructor(id, quizId, question) {
    this.id = id;
    this.quizId = quizId;
    this.question = question;
  }

  @action toggleEnabled = () => {
    this.enabled = !this.enabled;
  }
}
