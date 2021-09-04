import React from 'react';
import styles from './Imager.module.css';
import cat from './react-builds-cat.png';

function Images() {
  return (
    <div>
      <img src={cat} alt='Cat' />
      <div className={styles.cat}></div>
    </div>
  );
}

export default Images;
