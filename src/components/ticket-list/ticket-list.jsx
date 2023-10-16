import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAviasalesTicket } from '../../api/avisalesAsyncThunk';
import Ticket from '../ticket/ticket';
import Button from '../button';
import Tabs from '../tabs/tabs';
import Message from '../message/message';
import styles from './Ticket-list.module.scss';
import { filterTickets } from '../../utils/filterTickets';
import { sortTickets } from '../../utils/sortTickets';

function TicketList() {
  const ticket = useSelector((state) => state.aviasales.ticket);
  const dispatch = useDispatch();
  const checkbox = useSelector((state) => state.aviasales.filters);
  const sortMethod = useSelector((state) => state.aviasales.sortMethod);
  const [displayTickets, setDisplayTickets] = useState(5);
  useEffect(() => {
    dispatch(fetchAviasalesTicket());
  }, []);

  const showMoreTickets = () => {
    setDisplayTickets((prevDisplayTickets) => prevDisplayTickets + 5);
  };

  const filteredTickets = useMemo(() => filterTickets(checkbox, ticket), [checkbox, ticket]);

  const sortedAndFilteredTickets = useMemo(
    () => sortTickets(filteredTickets, sortMethod),
    [filteredTickets, sortMethod],
  );
  return (
    <section className={styles.TicketList}>
      <Tabs />
      {sortedAndFilteredTickets.length > 0 ? (
        <>
          {sortedAndFilteredTickets.slice(0, displayTickets).map((item) => (
            <Ticket
              key={`${item.price}${item.carrier}${item.segments[0].date}${item.segments[1].duration}${item.segments[1].date}`}
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
