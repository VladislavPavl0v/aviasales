import React from 'react';
import '../../styles/variables.scss';
import styles from './App.module.scss';
import Filter from '../filter';
import TicketList from '../ticket-list';
import ContentLoader from '../loader/loader';
import Logo from '../../assets/Logo.png';

function App() {
  return (
    <section className={styles.app}>
      <header className={styles.logo_container}>
        <img src={Logo} alt="logo" />
      </header>
      <main className={styles.main}>
        <ContentLoader />
        <Filter />
        <section className={styles.content}>
          <TicketList />
        </section>
      </main>
    </section>
  );
}

export default App;
