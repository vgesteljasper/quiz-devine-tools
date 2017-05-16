import React from 'react';

const DeleteIcon = () => {

  const styles = {
    svg: {width: `28px`, height: `28px`},
    common: {stroke: `red`, strokeLinecap: `round`, strokeLinejoin: `round`, strokeWidth: `1.75px`},
    rect: {fill: `none`},
    line: {fill: `#fff`}
  };

  return (
    <svg style={styles.svg} xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'>
    <rect style={{...styles.rect, ...styles.common}} x='14.5' y='11.5' width='22' height='30' />
    <line style={{...styles.line, ...styles.common}} x1='10' y1='11.5' x2='41' y2='11.5' />
    <line style={{...styles.line, ...styles.common}} x1='25.5' y1='15' x2='25.5' y2='38' />
    <line style={{...styles.line, ...styles.common}} x1='19.5' y1='15' x2='19.5' y2='38' />
    <line style={{...styles.line, ...styles.common}} x1='31.5' y1='15' x2='31.5' y2='38' />
    <rect style={{...styles.rect, ...styles.common}} x='19.5' y='7.5' width='12' height='4' />
  </svg>
  );

};

export default DeleteIcon;
