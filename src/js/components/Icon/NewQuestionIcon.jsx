import React from 'react';

const NewQuestionButton = () => {

  const styles = {
    svg: {width: `32px`, height: `32px`},
    childs: {fill: `none`, stroke: `#333`, strokeLinecap: `round`, strokeLinejoin: `round`, strokeWidth: `2px`},
  };

  return (
    <svg style={styles.svg} xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'>
      <line style={styles.childs} x1='14.5' y1='6.5' x2='14.5' y2='16.5' />
      <line style={styles.childs} x1='19.5' y1='11.5' x2='9.5' y2='11.5' />
      <polyline style={styles.childs} points='14.5 21.5 14.5 41.5 36.5 41.5 36.5 11.5 24 11.5' />
      <path style={styles.childs} d='M21,24s0-4.5,4.5-4.5S30,24,30,24s0,4.5-4.5,4.5v3' />
      <line style={styles.childs} x1='25.5' y1='34.5' x2='25.5' y2='35' />
    </svg>
  );

};

export default NewQuestionButton;
