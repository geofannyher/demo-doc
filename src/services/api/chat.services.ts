import axios from "axios";
import {
  TChatDataProps,
  THistoryChatAdmin,
  TResetChat,
} from "../../utils/types/chat.type";

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
      temperature: 1,
      id,
      message: message,
      chat_limit: 20,
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
    const response = await fetch(`${import.meta.env.VITE_APP_CHATT}achat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        star,
        model,
        temperature: 1,
        id,
        message,
        chat_limit: 1,
        is_rag,
      }),
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

export const chatAdmin = async ({ id, star }: THistoryChatAdmin) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_CHATT}history`,
      {
        star: star,
        id,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
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
