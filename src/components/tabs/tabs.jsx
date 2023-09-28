import React from "react";
import styles from "./Tabs.module.scss";

function Tabs() {
  return (
    <section className={styles.tabs}>
      <button
        style={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}
        className={styles.tabs__button}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button className={styles.tabs__button}>САМЫЙ ОПТИМАЛЬНЫЙ</button>
      <button
        className={styles.tabs__button}
        style={{
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
    </section>
  );
}

export default Tabs;
