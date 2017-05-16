import React from 'react';

const NewAnswerIcon = () => {

  const styles = {
    svg: {width: `32px`, height: `32px`},
    childs: {fill: `none`, stroke: `#333`, strokeLinecap: `round`, strokeLinejoin: `round`, strokeWidth: `2px`},
  };

  return (
    <svg style={styles.svg} xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'>
      <line style={styles.childs} x1='14.5' y1='6.5' x2='14.5' y2='16.5' />
      <line style={styles.childs} x1='19.5' y1='11.5' x2='9.5' y2='11.5' />
      <polyline style={styles.childs} points='14.5 21.5 14.5 41.5 36.5 41.5 36.5 11.5 24 11.5' />
      <line style={styles.childs} x1='31.5' y1='26.5' x2='20.5' y2='26.5' />
      <line style={styles.childs} x1='26' y1='32' x2='26' y2='21' />
      <line style={styles.childs} x1='22.11' y1='30.39' x2='29.89' y2='22.61' />
      <line style={styles.childs} x1='22.11' y1='22.61' x2='29.89' y2='30.39' />
    </svg>
  );

};

export default NewAnswerIcon;
