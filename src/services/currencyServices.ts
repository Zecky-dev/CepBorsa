import axios from 'axios';
import {BASE_URL} from '../constants';

export const fetchAllCurrencies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/currency`);
    return response.data;
  } catch (error) {
    console.log('FETCH_ALL_STOCKS_ERROR', error);
    throw error;
  }
};
