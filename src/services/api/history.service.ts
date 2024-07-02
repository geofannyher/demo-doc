import { supabase } from "../supabase/connection";

export const getHistoryChats = async () => {
  try {
    const data = await supabase
      .from("chats")
      .select("*")
      .eq("id", 1)
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
