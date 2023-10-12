/* eslint-disable import/no-cycle */
/* eslint-disable no-await-in-loop */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { updateAddTicket } from './aviasalesSlice';

export const fetchAviasalesTicket = createAsyncThunk(
  'aviasales/fetchAviasalesTicket',
  async (_, thunkAPI) => {
    try {
      const BASE_URL = 'https://aviasales-test-api.kata.academy';
      const searchResponse = await axios.get(`${BASE_URL}/search`);
      const searchId = searchResponse.data.searchId;

      const allTickets = [];
      let stop = false;
      const maxAttempts = 3;

      while (!stop) {
        let attempts = maxAttempts;
        while (attempts > 0) {
          try {
            const ticketsResponse = await axios.get(`${BASE_URL}/tickets?searchId=${searchId}`);
            thunkAPI.dispatch(updateAddTicket(ticketsResponse.data.tickets));
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

export default fetchAviasalesTicket;
