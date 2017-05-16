import React from 'react';
import {string} from 'prop-types';
import {inject, observer, PropTypes} from 'mobx-react';
import {object, number} from 'prop-types';
import {default as swal} from 'sweetalert2';

import Detail from './../Detail';
import ActionIconButton from './../ActionIconButton';

const AnswerStat = ({answer: answr, totalVotes, detail, store}) => {

  const {id, answer, correct, votes} = answr;
  const {removeAnswer} = store;

  const width = `${(votes / totalVotes) * 100}%`;
  const backgroundColor = correct ? `lighrgreen` : `pink`;
  const styles = {width, backgroundColor};

  const deleteAnswerHandler = () => {
    swal({
      title: `Are you sure you want to delete this answer?`,
      text: answer,
      confirmButtonText: `Delete`,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      allowEscapeKey: true,
      confirmButtonColor: `#f82831`
    })
    .then(() => {
      removeAnswer(id)
        .catch(() => swal(`Error`, `Answer couldn't be deleted. Please try again.`, `error`));
    })
    .catch(err => console.log(err));
  };

  return (
    <div className='stat'>
      <div className='stat__visual'>
        <h5 className='stat__answer'>
          <Detail value={detail} />
          <span>{answer} {correct ? ` (True)` : ` (False)`}</span>
        </h5>
        <span className='stat__votes'>{votes}</span>
        <div className='stat__bar' style={styles}></div>
      </div>
      <div className='action-bar action-bar_answer action-bar_right'>
        <ActionIconButton type='delete' title='Delete Answer' method={deleteAnswerHandler} />
      </div>
    </div>
  );
};

AnswerStat.propTypes = {
  answer: object.isRequired,
  totalVotes: number.isRequired,
  detail: string.isRequired,
  store: PropTypes.observableObject.isRequired
};

export default inject(`store`)(observer(AnswerStat));
