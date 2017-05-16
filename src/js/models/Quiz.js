import {action, observable} from 'mobx';

export default class Quiz {

  @observable published = false
  @observable name = ``

  constructor(id, created, name, published) {
    this.id = id;
    this.created = created;
    this.name = name;
    this.published = published;
  }

  @action togglePublished = () => {
    this.published = !this.published;
  }

}
