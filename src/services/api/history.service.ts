import { supabase } from "../supabase/connection";

export const getHistoryChats = async () => {
  try {
    const data = await supabase
      .from("chat_ikn")
      .select("*")
      .eq("idref", 1)
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
