import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSortMethod } from '../../store/aviasalesSlice';

import styles from './Tabs.module.scss';

function Tabs() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('');

  const handleSort = (method) => {
    dispatch(setSortMethod(method));
    setActiveTab(method);
  };
  return (
    <section className={styles.tabs}>
      <button
        type="button"
        style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}
        className={`${styles.tabs__button} ${
          activeTab === 'самый дешевый' ? styles.active__button : ''
        }`}
        onClick={() => handleSort('самый дешевый')}
      >
        самый дешевый
      </button>
      <button
        type="button"
        className={`${styles.tabs__button} ${
          activeTab === 'самый быстрый' ? styles.active__button : ''
        }`}
        style={{
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px',
        }}
        onClick={() => handleSort('самый быстрый')}
      >
        самый быстрый
      </button>
    </section>
  );
}

export default Tabs;
