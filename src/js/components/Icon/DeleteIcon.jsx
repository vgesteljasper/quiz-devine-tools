import React from 'react';

const DeleteIcon = () => {

  const styles = {width: `20px`, height: `20px`};

  return (
    <svg viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg' style={styles}>
      <path d='M41,48H7V7h34V48z M9,46h30V9H9V46z' />
      <path d='M35,9H13V1h22V9z M15,7h18V3H15V7z' />
      <path d='M16,41c-0.553,0-1-0.447-1-1V15c0-0.553,0.447-1,1-1s1,0.447,1,1v25C17,40.553,16.553,41,16,41z' />
      <path d='M24,41c-0.553,0-1-0.447-1-1V15c0-0.553,0.447-1,1-1s1,0.447,1,1v25C25,40.553,24.553,41,24,41z' />
      <path d='M32,41c-0.553,0-1-0.447-1-1V15c0-0.553,0.447-1,1-1s1,0.447,1,1v25C33,40.553,32.553,41,32,41z' />
      <rect height='2' width='48' y='7' />
    </svg>
  );

};

export default DeleteIcon;
