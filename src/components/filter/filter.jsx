import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/aviasalesSlice';
import styles from './Filter.module.scss';

function FilterItem({ value, label, checked, onClick }) {
  return (
    <li className={styles.checkbox}>
      <label className={styles.checkbox__label} htmlFor={label}>
        <input
          id={label}
          className={styles.checkbox__real}
          type="checkbox"
          checked={checked}
          onChange={() => onClick(!checked, value)}
        />
        <span className={styles.checkbox__unreal} />
        {label}
      </label>
    </li>
  );
}

FilterItem.propTypes = {
  value: propTypes.string,
  label: propTypes.string,
  checked: propTypes.bool,
  onClick: propTypes.func,
};

FilterItem.defaultProps = {
  value: undefined,
  label: undefined,
  checked: false,
  onClick: () => {},
};

function Filter() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.aviasales.filters);

  const [isAll, setIsAll] = useState(false);

  useEffect(() => {
    const allChecked = filters.every((filter) => filter.value);
    setIsAll(allChecked);
  }, [filters]);

  const toggleAllFilter = (isChecked) => {
    dispatch(setFilter({ name: 'Все', value: isChecked }));
    filters.forEach((filter) => {
      dispatch(setFilter({ name: filter.name, value: isChecked }));
    });
  };

  const toggleFilter = (name, isChecked) => {
    dispatch(setFilter({ name, value: isChecked }));
  };

  return (
    <aside className={styles.filter}>
      <span className={styles.filter__title}>количество пересадок</span>
      <ul className={styles.filter__items}>
        <FilterItem value="Все" label="Все" checked={isAll} onClick={toggleAllFilter} />
        {filters.map((filter) => (
          <FilterItem
            key={filter.name}
            value={filter.name}
            label={filter.name}
            checked={filter.value}
            onClick={(isChecked, name) => toggleFilter(name, isChecked)}
          />
        ))}
      </ul>
    </aside>
  );
}

export default Filter;
