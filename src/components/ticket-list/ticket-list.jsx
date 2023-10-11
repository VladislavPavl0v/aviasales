/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAviasalesTicket, updateAddTicket } from '../../store/aviasalesSlice';
import Ticket from '../ticket/ticket';
import Button from '../button';
import Tabs from '../tabs/tabs';
import Message from '../message/message';
import styles from './Ticket-list.module.scss';

function TicketList() {
  const ticket = useSelector((state) => state.aviasales.ticket);
  const displayTickets = useSelector((state) => state.aviasales.addTicket);
  const dispatch = useDispatch();
  const checkbox = useSelector((state) => state.aviasales.filters);
  const sortMethod = useSelector((state) => state.aviasales.sortMethod);

  useEffect(() => {
    dispatch(fetchAviasalesTicket());
  }, []);

  const showMoreTickets = () => {
    dispatch(updateAddTicket(displayTickets + 5));
  };
  const filterTickets = (filters, tickets, isAll) => {
    if (isAll) {
      return tickets;
    }
    if (filters.every((filter) => !filter.value)) {
      return [];
    }
    return tickets.filter((item) => {
      const stopsCount = item.segments[0].stops.length;
      return filters.some((filter) => {
        if (filter.value) {
          return stopsCount === filter.id;
        }
        return false;
      });
    });
  };

  const sortTickets = (tickets, method) =>
    [...tickets].sort((a, b) => {
      if (method === 'самый дешевый') {
        return a.price - b.price;
      }
      if (method === 'самый быстрый') {
        const durationA = a.segments[0].duration;
        const durationB = b.segments[0].duration;
        return durationA - durationB;
      }
      return 0;
    });

  const filteredTickets = filterTickets(checkbox, ticket);
  const sortedAndFilteredTickets = sortTickets(filteredTickets, sortMethod);

  return (
    <section className={styles.TicketList}>
      <Tabs />
      {sortedAndFilteredTickets.length > 0 ? (
        <>
          {sortedAndFilteredTickets.slice(0, displayTickets).map((item, index) => (
            <Ticket
              key={uuidv4()}
              price={item.price}
              startOrigin={item.segments[0].origin}
              stopOrigin={item.segments[1].origin}
              startDestination={item.segments[0].destination}
              stopDestination={item.segments[1].destination}
              durationStart={item.segments[0].duration}
              dateStart={item.segments[0].date}
              durationStop={item.segments[1].duration}
              dateStop={item.segments[1].date}
              quantityTransferStart={item.segments[0].stops}
              quantityTransferStop={item.segments[1].stops}
              logo={item.carrier}
            />
          ))}
          {displayTickets < sortedAndFilteredTickets.length && <Button onClick={showMoreTickets} />}
        </>
      ) : (
        <div className={styles.message}>
          <Message />
        </div>
      )}
    </section>
  );
}

export default TicketList;
