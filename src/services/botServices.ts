import axios from "axios";
import { Platform } from "react-native";

const PORT = 3000
const BASE_URL = Platform.OS === "android" ? `http://10.0.2.2:${PORT}/api` : `http://localhost:${PORT}/api`

interface BotResponseSuccess {
    success: boolean;
    data: string;
}

interface BotResponseError {
    success: boolean;
    error: {
        message: string;
        type: string;
        status: number;
    }
}

type ApiResponse = BotResponseSuccess | BotResponseError


export const askQuestion = async (question: string) : Promise<ApiResponse> => {
    try {
        const response = await axios.get<ApiResponse>(`${BASE_URL}/bot/ask?question=${question}`)
        return response.data;
    }
    catch(error) {
        console.log("BOT_ASK_QUESTION_ERROR", error)
        throw error
    }
}
