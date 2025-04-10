import axios from "axios";
import { BASE_URL } from '../constants';

import { StockApiResponse } from "@types/StockResponse";

export const fetchAllStocks = async (year: number = 2025, page: number = 1) : Promise<StockListResponse> => {
    try {
        const response = await axios.get<StockListResponse>(`${BASE_URL}/stock/list?year=${year}&page=${page}`)
        return response.data;
    }
    catch(error) {
        console.log("FETCH_ALL_STOCKS_ERROR", error)
        throw error
    }
}

export const fetchStock = async (stockName: string) : Promise<StockApiResponse> => {
    try {
        const response = await axios.get<StockApiResponse>(`${BASE_URL}/stock?stockName=${stockName}`)
        return response.data;
    }
    catch(error) {
        console.log("FETCH_STOCK_ERROR", error)
        throw error
    }
}