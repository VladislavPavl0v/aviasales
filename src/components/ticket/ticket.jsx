import React from "react";
import styles from "./Ticket.module.scss";

function Ticket() {
  return (
    <section className={styles.ticket}>
      <div className={styles.ticket__top}>
        <span className={styles.price}>13 400 Р</span>
        <div>Бренд</div>
      </div>
      <div className={styles.ticket__sections}>
      <div className={styles.ticket__items}>
        <span className={styles.ticket__label}>MOW – HKT</span>
        <span className={styles.ticket__time}>10:45 – 08:00</span>
      </div>
      </div>
    </section>
  );
}

export default Ticket;
