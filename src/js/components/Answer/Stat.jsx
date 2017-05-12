import React from 'react';
import {string} from 'prop-types';
import {observer, PropTypes} from 'mobx-react';
import {func, number} from 'prop-types';
import {default as swal} from 'sweetalert2';

import Detail from './../Detail';
import DeleteButton from './../DeleteButton';

const AnswerStat = ({answer: answr, removeAnswer, totalVotes, detail}) => {

  const {id, answer, correct, votes} = answr;

  const width = `${(votes / totalVotes) * 100}%`;
  const backgroundColor = correct ? `lighrgreen` : `pink`;
  const styles = {width, backgroundColor};

  const removeAnswerHandler = () => {
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
        .then(() => swal(`Success`, `Answer has been deleted.`, `success`))
        .catch(() => swal(`Error`, `Answer couldn't be deleted. Please try again.`, `error`));
    })
    .catch(err => console.log(err));
  };

  return (
    <div className='stat'>
      <div className='stat__visual'>
        <h5 className='stat__answer'>
          <Detail value={detail} />
          <span>{answer}</span>
        </h5>
        <span className='stat__votes'>{votes}</span>
        <div className='stat__bar' style={styles}></div>
      </div>
      <div className='action-bar action-bar_right'>
        <DeleteButton method={removeAnswerHandler} />
      </div>
    </div>
  );
};

AnswerStat.propTypes = {
  answer: PropTypes.observableObject.isRequired,
  removeAnswer: func.isRequired,
  totalVotes: number.isRequired,
  detail: string.isRequired
};

export default observer(AnswerStat);
