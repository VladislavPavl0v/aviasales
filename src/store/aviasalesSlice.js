/* eslint-disable no-await-in-loop */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAviasalesTicket = createAsyncThunk(
  'aviasales/fetchAviasalesTicket',
  async (_, thunkAPI) => {
    try {
      const BASE_URL = 'https://aviasales-test-api.kata.academy';
      const searchResponse = await axios.get(`${BASE_URL}/search`);
      const searchId = searchResponse.data.searchId;

      let allTickets = [];
      let stop = false;
      const maxAttempts = 3;

      while (!stop) {
        let attempts = maxAttempts;
        while (attempts > 0) {
          try {
            const ticketsResponse = await axios.get(`${BASE_URL}/tickets?searchId=${searchId}`);
            allTickets = [...allTickets, ...ticketsResponse.data.tickets];
            if (ticketsResponse.data.stop) {
              stop = true;
            }
            break;
          } catch (error) {
            if (error.response && error.response.status === 500) {
              attempts--;
              if (attempts === 0) {
                throw new Error('Наблюдаеться турбулетность');
              }
            } else {
              throw error;
            }
          }
        }
      }

      return allTickets;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  filters: [
    { name: 'Без пересадок', value: false, id: 0 },
    { name: '1 пересадка', value: false, id: 1 },
    { name: '2 пересадки', value: false, id: 2 },
    { name: '3 пересадки', value: false, id: 3 },
  ],
  ticket: [],
  isLoading: 0,
  addTicket: 5,
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
      state.addTicket = action.payload;
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
      state.ticket = action.payload;
      state.isLoading = 50;
      state.error = null;
    });
    builder.addCase(fetchAviasalesTicket.rejected, (state, action) => {
      state.ticket = [];
      state.isLoading = 100;
      state.error = action.payload;
    });
  },
});

export const { setFilter, updateAddTicket, setSortMethod, updateLoadingProgress } =
  aviasalesSlice.actions;

export default aviasalesSlice.reducer;
