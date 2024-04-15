import axios from "axios";
import { TChatDataProps, TResetChat } from "../../utils/types/chat.type";

export const chatRes = async ({
  message,
  star,
  model,
  id,
  is_rag,
}: TChatDataProps) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_CHATT}chat`, {
      star: star,
      model: model,
      temperature: 0,
      id,
      message: message,
      chat_limit: 0,
      is_rag,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const chatResNew = async ({
  message,
  star,
  model,
  id,
  is_rag,
}: TChatDataProps) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_CHATT}chat`, {
      star: star,
      model: model,
      temperature: 0,
      id,
      message: message,
      chat_limit: 1,
      is_rag,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const generateRandomString = async () => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
};

export const resetStarId = async ({ id, star }: TResetChat) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_APP_CHATT}reset`, {
      id,
      star,
    });
    return res;
  } catch (error) {
    return error;
  }
};
