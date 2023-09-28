import React from "react";
import Logo from "./Logo.png";
import "../../styles/variables.scss";
import styles from "./App.module.scss";

import Tabs from "../tabs";
import Filter from "../filter";
import TicketList from "../ticket-list";
import Button from "../button";

function App() {
  return (
    <section className={styles.app}>
      <header className={styles.logo_container}>
        <img src={Logo} alt="logo" />
      </header>
      <main className={styles.main}>
        <Filter />
        <section className={styles.content}>
          <Tabs />
          <TicketList />
          <Button />
        </section>
      </main>
    </section>
  );
}

export default App;
