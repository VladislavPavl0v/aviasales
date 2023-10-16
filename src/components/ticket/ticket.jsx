import React from 'react';
import PropTypes from 'prop-types';
import { add } from 'date-fns';
import styles from './Ticket.module.scss';

function Ticket(props) {
  const {
    price,
    durationStart,
    dateStart,
    durationStop,
    dateStop,
    startOrigin,
    stopOrigin,
    quantityTransferStart,
    quantityTransferStop,
    logo,
  } = props;
  const baseUrl = 'https://pics.avs.io/99/36/';

  const formattedPrice = price.toLocaleString('ru-RU');


  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    if (hours.toString().split('').length === 1 && minutes.toString().split('').length === 1)
      return `0${hours}:0${minutes}`;
    if (minutes.toString().split('').length === 1) return `${hours}:0${minutes}`;
    return `${hours}:${minutes}`;
  }

  function convertDate(time, duration) {
    time = new Date(time);
    const res = [time.getHours(), time.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(':');
    const res2 = add(new Date(time), {
      minutes: duration,
    });
    const end = [res2.getHours(), res2.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(':');
    return `${res} - ${end}`;
  }

  function transfer(arr) {
    if (arr.length === 1) return `${arr.length} ПЕРЕСАДКА`;
    if (arr.length === 0) return `${arr.length} ПЕРЕСАДОК`;
    if (arr.length === 3 || arr.length === 2) return `${arr.length} ПЕРЕСАДКИ`;
    return '';
  }

  return (
    <section className={styles.ticket}>
      <div className={styles.ticket__top}>
        <span className={styles.price}>{formattedPrice} Р</span>
        <img src={logo ? `${baseUrl}${logo}.png` : null} alt="logo" />
      </div>
      <div className={styles.ticket__sections}>
        <div className={styles.ticket__items}>
          <span className={styles.ticket__span}>
            {startOrigin} – {stopOrigin}
          </span>
          <span className={styles.ticket__time}>{convertDate(dateStart, durationStart)}</span>
        </div>
        <div className={styles.ticket__items}>
          <span className={styles.ticket__span}>В ПУТИ</span>
          <span className={styles.ticket__time}>{getTimeFromMins(durationStart)}</span>
        </div>
        <div className={styles.ticket__items}>
          <span className={styles.ticket__span}>{transfer(quantityTransferStart)}</span>
          <span className={styles.ticket__time}>{quantityTransferStart.join(', ')}</span>
        </div>
      </div>
      <div className={styles.ticket__sections}>
        <div className={styles.ticket__items}>
          <span className={styles.ticket__span}>
            {startOrigin} – {stopOrigin}
          </span>
          <span className={styles.ticket__time}>{convertDate(dateStop, durationStop)}</span>
        </div>
        <div className={styles.ticket__items}>
          <span className={styles.ticket__span}>В ПУТИ</span>
          <span className={styles.ticket__time}>{getTimeFromMins(durationStop)}</span>
        </div>
        <div className={styles.ticket__items}>
          <span className={styles.ticket__span}>{transfer(quantityTransferStop)}</span>
          <span className={styles.ticket__time}>{quantityTransferStop.join(', ')}</span>
        </div>
      </div>
    </section>
  );
}

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  durationStart: PropTypes.number.isRequired,
  dateStart: PropTypes.string.isRequired,
  durationStop: PropTypes.number.isRequired,
  dateStop: PropTypes.string.isRequired,
  startOrigin: PropTypes.string.isRequired,
  stopOrigin: PropTypes.string.isRequired,
  quantityTransferStart: PropTypes.arrayOf(PropTypes.string).isRequired,
  quantityTransferStop: PropTypes.arrayOf(PropTypes.string).isRequired,
  logo: PropTypes.string,
};
Ticket.defaultProps = {
  logo: null,
};

export default Ticket;
