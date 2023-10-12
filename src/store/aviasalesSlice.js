/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';
import { fetchAviasalesTicket } from './avisalesAsyncThunk';

const initialState = {
  filters: [
    { name: 'Без пересадок', value: false, id: 0 },
    { name: '1 пересадка', value: false, id: 1 },
    { name: '2 пересадки', value: false, id: 2 },
    { name: '3 пересадки', value: false, id: 3 },
  ],
  ticket: [],
  isLoading: 0,
  sortMethod: '',
  error: null,
};

const aviasalesSlice = createSlice({
  name: 'aviasales',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { name, value, id } = action.payload;
      const filter = state.filters.find((f) => f.name === name);
      if (filter) {
        filter.id = id;
        filter.value = value;
      }
    },
    updateAddTicket: (state, action) => {
      state.ticket = [...state.ticket, ...action.payload];
    },

    setSortMethod: (state, action) => {
      state.sortMethod = action.payload;
    },
    updateLoadingProgress: (state, action) => {
      state.isLoading += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAviasalesTicket.pending, (state) => {
      state.isLoading = 0;
      state.error = null;
    });
    builder.addCase(fetchAviasalesTicket.fulfilled, (state, action) => {
      state.ticket = [...state.ticket, ...action.payload];
      state.isLoading = 97;
      state.error = null;
    });

    builder.addCase(fetchAviasalesTicket.rejected, (state, action) => {
      state.ticket = [];
      state.isLoading = 107;
      state.error = action.payload;
    });
  },
});

export const { setFilter, updateAddTicket, setSortMethod, updateLoadingProgress } =
  aviasalesSlice.actions;

export default aviasalesSlice.reducer;
