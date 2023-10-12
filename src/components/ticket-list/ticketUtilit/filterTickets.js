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

  export default filterTickets;