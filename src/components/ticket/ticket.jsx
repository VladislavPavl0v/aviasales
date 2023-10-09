/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
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
  }

  return (
    <section className={styles.ticket}>
      <div className={styles.ticket__top}>
        <span className={styles.price}>{formattedPrice} Р</span>
        <img src={logo ? `${baseUrl}${logo}.png` : null} alt="logo" />
      </div>
      <div className={styles.ticket__sections}>
        <div className={styles.ticket__items}>
          <label className={styles.ticket__label}>
            {startOrigin} – {stopOrigin}
          </label>
          <label className={styles.ticket__time}>{convertDate(dateStart, durationStart)}</label>
        </div>
        <div className={styles.ticket__items}>
          <label className={styles.ticket__label}>В ПУТИ</label>
          <label className={styles.ticket__time}>{getTimeFromMins(durationStart)}</label>
        </div>
        <div className={styles.ticket__items}>
          <label className={styles.ticket__label}>{transfer(quantityTransferStart)}</label>
          <label className={styles.ticket__time}>{quantityTransferStart.join(', ')}</label>
        </div>
      </div>
      <div className={styles.ticket__sections}>
        <div className={styles.ticket__items}>
          <label className={styles.ticket__label}>
            {startOrigin} – {stopOrigin}
          </label>
          <label className={styles.ticket__time}>{convertDate(dateStop, durationStop)}</label>
        </div>
        <div className={styles.ticket__items}>
          <label className={styles.ticket__label}>В ПУТИ</label>
          <label className={styles.ticket__time}>{getTimeFromMins(durationStop)}</label>
        </div>
        <div className={styles.ticket__items}>
          <label className={styles.ticket__label}>{transfer(quantityTransferStop)}</label>
          <label className={styles.ticket__time}>{quantityTransferStop.join(', ')}</label>
        </div>
      </div>
    </section>
  );
}

export default Ticket;
