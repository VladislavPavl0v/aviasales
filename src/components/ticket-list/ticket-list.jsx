import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAviasalesTicket } from '../../store/aviasalesSlice';
// eslint-disable-next-line no-unused-vars
import styles from './Ticket-list.module.scss';
import Ticket from '../ticket/ticket';

function TicketList() {
  const ticket = useSelector((state) => state.aviasales.ticket);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAviasalesTicket());
  }, []);
  console.log(ticket);
  return (
    <div>
      {ticket.map((item) => (
        <Ticket
          key={item.index}
          price={item.price}
          startOrigin={item.segments[0].origin}
          stopOrigin={item.segments[1].origin}
          startDestination={item.segments[0].destination}
          stopDestination={item.segments[1].destination}
          durationStart={item.segments[0].duration}
          dateStart={item.segments[0].date}
          durationStop={item.segments[1].duration}
          dateStop={item.segments[1].date}
          quantityTransferStart = {item.segments[0].stops}
          quantityTransferStop = {item.segments[1].stops}
          logo = {item.carrier}
        />
      ))}
    </div>
  );
}

export default TicketList;
