import React from 'react';
import propTypes from 'prop-types';
import styles from './Filter-item.module.scss'

function FilterItem({ value, label, checked, onClick, id }) {
  return (
    <li className={styles.checkbox}>
      <label className={styles.checkbox__label} htmlFor={id}>
        <input
          id={id}
          className={styles.checkbox__real}
          type="checkbox"
          checked={checked}
          onChange={() => onClick(!checked, value, id)}
        />
        <span className={styles.checkbox__unreal} />
        {label}
      </label>
    </li>
  );
}

FilterItem.propTypes = {
  id: propTypes.number,
  value: propTypes.string,
  label: propTypes.string,
  checked: propTypes.bool,
  onClick: propTypes.func,
};

FilterItem.defaultProps = {
  id: undefined,
  value: undefined,
  label: undefined,
  checked: false,
  onClick: () => {},
};

export default FilterItem;
