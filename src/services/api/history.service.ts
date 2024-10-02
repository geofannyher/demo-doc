import { supabase } from "../supabase/connection";

export const getHistoryChats = async () => {
  try {
    const data = await supabase
      .from("chat_doc")
      .select("*")
      .order("created_at", { ascending: true });
    if (data) {
      return data;
    } else {
      throw new Error("cannot chat");
    }
  } catch (error: any) {
    return error.message;
  }
};
