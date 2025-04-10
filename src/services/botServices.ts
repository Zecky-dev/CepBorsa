import axios from 'axios';
import {BASE_URL} from '../constants';

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
  };
}

type ApiResponse = BotResponseSuccess | BotResponseError;

export const askQuestion = async (question: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${BASE_URL}/bot/ask?question=${question}`,
    );
    return response.data;
  } catch (error) {
    console.log('BOT_ASK_QUESTION_ERROR', error);
    throw error;
  }
};
