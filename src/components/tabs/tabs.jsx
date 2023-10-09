import React from 'react';
import styles from './Tabs.module.scss';

function Tabs() {
  return (
    <section className={styles.tabs}>
      <button
        type="button"
        style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}
        className={styles.tabs__button}
      >
        самый дешевый
      </button>
      <button type="button" className={styles.tabs__button}>
        самый оптимальный
      </button>
      <button
        type="button"
        className={styles.tabs__button}
        style={{
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px',
        }}
      >
        самый быстрый
      </button>
    </section>
  );
}

export default Tabs;
