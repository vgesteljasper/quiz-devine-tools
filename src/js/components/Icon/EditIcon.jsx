import React from 'react';

const EditIcon = () => {

  const styles = {
    svg: {width: `30px`, height: `30px`},
    polygon: {fill: `none`, stroke: `#333`, strokeLinecap: `round`, strokeLinejoin: `round`, strokeWidth: `2px`},
  };

  return (
    <svg style={styles.svg} xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'>
      <polyline style={styles.polygon} points='36.5 17.5 36.5 41.5 14.5 41.5 14.5 11.5 30.5 11.5' />
      <polygon style={styles.polygon} points='40.48 8.02 39.78 7.31 26.34 20.74 23.52 24.98 27.76 22.16 37.66 12.26 41.19 8.72 40.48 8.02' />
      <line x1='36.24' y1='10.84' x2='37.66' y2='12.26' />
    </svg>
  );

};

export default EditIcon;
