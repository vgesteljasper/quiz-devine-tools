import {observable} from 'mobx';

class Modal {

  @observable active = false

  title = `title`;
  text = `text`;
  type = `html`;
  value = ``;
  buttons = [];

  promiseResolve;
  promiseReject;

  constructor() {
    this.buttons.push(
      {type: `cancel`, text: `Cancel`, handler: this.handleCancelAlert},
      {type: `continue`, text: `Continue`, handler: this.handleContinueAlert}
    );
  }

  handleCancelAlert = () => {
    this.promiseReject(`cancel`);
    this.active = false;
  }

  handleContinueAlert = () => {
    if (this.type === `html` || this.type === `text`) {
      this.promiseResolve(this.value);
    } else {
      this.promiseResolve();
    }
    this.active = false;
  }

  updateValue(value) {
    this.value = value;
  }

  popAlert = (options = {}) => {
    return new Promise((resolve, reject) => {

      this.promiseResolve = resolve;
      this.promiseReject = reject;

      if (this.active) throw new Error(`modal instance initiated already`);

      if (`title` in options) this.title = options.title;
      if (`text` in options) this.text = options.text;
      if (`type` in options) this.type = options.type;
      if (`continueButtonText` in options) this.buttons[1].text = options.continueButtonText;

      this.active = true;
    });
  }
}

const modal = new Modal();

if (process.env.NODE_ENV !== `production`) {
  window.modal = modal;
}

export default modal;
