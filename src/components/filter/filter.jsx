/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './Filter.module.scss';

function Filter() {
  return (
    <aside className={styles.filter}>
      <span className={styles.filter__title}>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      <ul className={styles.filter__items}>
        <li className={styles.checkbox}>
          <label className={styles.checkbox__label}>
            <input className={styles.checkbox__real} type="checkbox" />
            <span className={styles.checkbox__unreal} />
            Все
          </label>
        </li>
        <li className={styles.checkbox}>
          <label className={styles.checkbox__label}>
            <input className={styles.checkbox__real} type="checkbox" />
            <span className={styles.checkbox__unreal} />
            Без пересадок
          </label>
        </li>
        <li className={styles.checkbox}>
          <label className={styles.checkbox__label}>
            <input className={styles.checkbox__real} type="checkbox" />
            <span className={styles.checkbox__unreal} />1 пересадка
          </label>
        </li>
        <li className={styles.checkbox}>
          <label className={styles.checkbox__label}>
            <input className={styles.checkbox__real} type="checkbox" />
            <span className={styles.checkbox__unreal} />2 пересадки
          </label>
        </li>
        <li className={styles.checkbox}>
          <label className={styles.checkbox__label} >
            <input className={styles.checkbox__real} type="checkbox" />
            <span className={styles.checkbox__unreal} />3 пересадки
          </label>
        </li>
      </ul>
    </aside>
  );
}
export default Filter;
