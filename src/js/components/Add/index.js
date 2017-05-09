/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {inject, observer} from 'mobx-react';
import {func, object} from 'prop-types';
import Button from './../Button/';
import AnswerInput from './AnswerInput';

const Add = ({toggleIsEditing, unstagedAnswers}) => {

  return (
    <section className='new-quiz'>
      <div className='new-quiz__content'>
        <div className='new-quiz__top-bar'>
          <Button value='Close' color='red' detail='&#215;' method={toggleIsEditing} />
        </div>
        <form>
          <label>
            <span className='label'>Quiz name:</span><br />
            <input type='text' /><br />
          </label>
          <label className='label'>Questions:</label><br />
          {
            unstagedAnswers.map(a => {
              return <AnswerInput key={a.id} />;
            })
          }
        </form>
      </div>
    </section>
  );
};

Add.propTypes = {
  toggleIsEditing: func.isRequired,
  unstagedAnswers: object.isRequired
};

export default inject(({store}) => {
  return {
    toggleIsEditing: store.toggleIsEditing,
    unstagedAnswers: store.unstagedAnswers
  };
})(observer(Add));
