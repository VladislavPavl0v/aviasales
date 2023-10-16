 export const sortTickets = (tickets, method) =>
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

