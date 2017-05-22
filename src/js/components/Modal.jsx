import React, {Component} from 'react';
import {observer, inject, PropTypes} from 'mobx-react';
import {Editor, EditorState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import uuid from 'uuid';

import Button from './Button.jsx';

const Modal = class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.store = props.modal;
    this.$editor;
  }

  componentDidMount() {
    if (this.store.active) this.$editor.focus();
  }

  handleFocus = () => this.$editor.focus();

  handleTextareaChange = editorState => {
    this.setState({editorState}); // update state value of editorstate
    const value = stateToHTML(editorState.getCurrentContent()); // convert value to html
    this.store.updateValue(value); // send to logic
  }

  handleButtonClick = handler => {
    if (this.store.type === `html`) this.setState({editorState: EditorState.createEmpty()});
    handler();
  }

  render() {
    if (this.store.active) {
      return (
        <div className='modal'>
          <div className='modal__alert'>
            <h1 className='modal__title'>{this.store.title}</h1>
            <h2 className='modal__text'>{this.store.text}</h2>
            <div className='modal__content'>
              <div className='modal__input'>
                {
                  this.store.type === `html`
                    ? <div className='modal__editor' onClick={this.handleFocus}>
                        <Editor
                          ref={el => this.$editor = el}
                          editorState={this.state.editorState}
                          onChange={this.handleTextareaChange}
                        />
                      </div>
                    : null
                }
                {
                  this.store.type === `text`
                    ? <input value='hellow input' />
                    : null
                }
              </div>
              <div className='modal__buttons'>
                {
                  this.store.buttons.map(b => (
                    <Button
                      key={uuid.v4()}
                      value={b.text}
                      method={() => this.handleButtonClick(b.handler)}
                      color={b.type === `cancel` ? `red` : ``}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
};

Modal.propTypes = {
  modal: PropTypes.observableObject.isRequired
};

export default inject(`modal`)(observer(Modal));
