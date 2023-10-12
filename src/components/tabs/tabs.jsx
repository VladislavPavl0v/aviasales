import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
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
        className={classNames(styles.tabs__button__left, {
          [styles.active__button]: activeTab === 'самый дешевый',
        })}
        onClick={() => handleSort('самый дешевый')}
      >
        самый дешевый
      </button>
      <button
        type="button"
        className={classNames(styles.tabs__button__right, {
          [styles.active__button]: activeTab === 'самый быстрый',
        })}
        onClick={() => handleSort('самый быстрый')}
      >
        самый быстрый
      </button>
    </section>
  );
}

export default Tabs;
