
export const addUniqueTickets = (existingTickets, newTickets) => {
  const existingTicketsHashes = new Set(existingTickets.map((ticket) => JSON.stringify(ticket)));
  const uniqueNewTickets = newTickets.filter(
    (ticket) => !existingTicketsHashes.has(JSON.stringify(ticket)),
  );
  return [...existingTickets, ...uniqueNewTickets];
};
