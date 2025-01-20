import axios from 'axios';
import { Platform } from 'react-native';

const PORT = 3000
const BASE_URL = Platform.OS === "android" ? `http://10.0.2.2:${PORT}/api` : `http://localhost:${PORT}/api`

export const fetchAllCurrencies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/currency`)
        return response.data;
    }
    catch(error) {
        console.log("FETCH_ALL_STOCKS_ERROR", error)
        throw error
    }
};
