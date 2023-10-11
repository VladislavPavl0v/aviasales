import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

function Button(props) {
  return (
    <section>
      <button type="button" className={styles.button} onClick={props.onClick}>
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ
      </button>
    </section>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
