import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/aviasalesSlice';
import styles from './Filter.module.scss';

function FilterItem({ value, label, checked, onClick, id }) {
  return (
    <li className={styles.checkbox}>
      <label className={styles.checkbox__label} htmlFor={id}>
        <input
          key={id}
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

function Filter() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.aviasales.filters);

  const [isAll, setIsAll] = useState(false);

  useEffect(() => {
    const allChecked = filters.every((filter) => filter.value);
    setIsAll(allChecked);
  }, [filters]);

  const toggleFilter = (name, isChecked, id) => {
    dispatch(setFilter({ name, value: isChecked, id }));
    const allSelected = filters.every((f) => (f.name === name ? isChecked : f.value));
    setIsAll(allSelected);
  };
  const toggleAllFilter = () => {
    const newIsAllState = !isAll;
    setIsAll(newIsAllState);

    filters.forEach((filter) => {
      dispatch(setFilter({ name: filter.name, value: newIsAllState, id: filter.id }));
    });
  };

  return (
    <aside className={styles.filter}>
      <span className={styles.filter__title}>количество пересадок</span>
      <ul className={styles.filter__items}>
        <FilterItem value="Все" label="Все" checked={isAll} onClick={toggleAllFilter} />
        {filters.map((filter) => (
          <FilterItem
            key={filter.id}
            id={filter.id}
            value={filter.name}
            label={filter.name}
            checked={filter.value}
            onClick={(isChecked, name, id) => toggleFilter(name, isChecked, id)}
          />
        ))}
      </ul>
    </aside>
  );
}

export default Filter;
