import axios from "axios";
import { Platform } from "react-native";

const PORT = 3000


const BASE_URL = Platform.OS === "android" ? `http://10.0.2.2:${PORT}/api` : `http://localhost:${PORT}/api`

import { StockApiResponse } from "@types/StockResponse";


export const fetchAllStocks = async (year: number = 2024, page: number = 1) : Promise<StockListResponse> => {
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