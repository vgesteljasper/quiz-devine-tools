import React from 'react';

const DevineLogo = () => {

  const styles = {
    svg: {
      width: `16.5px`,
      height: `35px`
    },
    path: {
      fill: `#fafafa`
    }
  };

  return (
    <svg style={styles.svg} id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 213'>
      <path style={styles.path} d='M97.23,59.71C89.87,54.18,21.38,2.79,12.16.13c-7.78-2.24-1.06,24,6.61,34.14L65.82,80l.1,77.09L50,172.48,34,157.32,33.85,88,11.52,64.74S0,51.12,0,70.7v88.4s-.94,7.13,8.1,16.73l31.07,31s9.78,12.43,21.68,0c12.35-12.89,31-31,31-31s7.84-6.27,7.84-16.28.23-89.53.23-89.53.54-7.34-2.07-9.88A3.1,3.1,0,0,0,97.23,59.71Z' />
    </svg>
  );

};

export default DevineLogo;
