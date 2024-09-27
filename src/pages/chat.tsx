import React, { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { notification } from "antd";
import { IMessage } from "../utils/interface/chat.interface";
import { AiChat, UserChat } from "../components/chat";
import Navbar from "../components/navbar";
import LoadingComponent from "../components/loader";
import { getIdSession } from "../services/supabase/session.service";
import { chatRes } from "../services/api/chat.services";
import notificationSound from "../assets/notif.mp3";
import { getSession } from "../shared/Session";
import { scrollToBottom } from "../lib/scrollSmooth";
import axios from "axios";
import { cleanString } from "../utils/cleanString";
import { supabase } from "../services/supabase/connection";
const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [api, context] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [idUserSession, setId] = useState("");
  const session = getSession();

  const getIdUser = async () => {
    const resses = await getIdSession();
    if (resses?.status == 200) {
      setId(resses?.data?.uuid_doc);
    } else {
      return api.error({ message: "Gagal mendapatkan id user" });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          text: "Hai 😊.",
          sender: "ai",
        },
      ]);
    }, 700);
    getIdUser();
  }, [session]);

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages]);

  const handleForm = async (event: any) => {
    event.preventDefault();

    let messageInput: any;

    messageInput = event?.target[0]?.value.trim();

    if (!messageInput) {
      return api.error({ message: "Kolom pesan tidak boleh kosong" });
    }
    event.target[0].value = "";
    event.target[1].value = "";

    setIsLoading(true);
    const userMessage = { text: messageInput, sender: "user" };

    setMessages((prevMessages: any) => [...prevMessages, userMessage]);

    const audio = new Audio(notificationSound);
    audio.play();
    const resNew: any = await chatRes({
      message: messageInput,
      star: "doc_chat",
      id: idUserSession,
      model: "gpt-4o",
      is_rag: "false",
    });

    const res = await axios.post(import.meta.env.VITE_APP_CHATT + "history", {
      id: idUserSession,
      star: "doc_chat",
    });

    const cleanedKonteks = cleanString(res?.data?.data?.history[1]?.content);

    await supabase.from("chat_doc").upsert([
      {
        text: messageInput,
        sender: "user",
        localid: idUserSession,
      },
      {
        text: resNew?.data?.data || "AI tidak merespon",
        sender: "ai",
        konteks: cleanedKonteks,
        localid: idUserSession,
      },
    ]);

    if (resNew && resNew?.data?.data) {
      setMessages((prevMessages: any) => {
        return [
          ...prevMessages.filter((m: any) => !m.isLoading),
          { text: resNew?.data?.data || "AI tidak merespon", sender: "ai" },
        ];
      });

      const audio = new Audio(notificationSound);
      audio.play();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages]);
  // useEffect(() => {
  //   if (idUserSession) {
  //     fetchChatHistory(); // Load chat history after getting the session ID
  //   }
  // }, [idUserSession]);

  // Fetch chat history from Supabase
  // const fetchChatHistory = async () => {
  //   if (idUserSession) {
  //     const { data, error } = await supabase
  //       .from("chat_doc")
  //       .select("text, sender")
  //       .eq("localid", idUserSession);

  //     if (error) {
  //       api.error({ message: "Gagal mengambil riwayat chat" });
  //     } else {
  //       setMessages(
  //         data.map((item: any) => ({ text: item.text, sender: item.sender }))
  //       );
  //     }
  //   }
  // };
  return (
    <div className="flex h-[100dvh] flex-col bg-white">
      <Navbar />
      {context}
      <div className="container hide-scrollbar mx-auto flex-1 space-y-2 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index}>
            {message.sender === "user" ? (
              <UserChat message={message.text} />
            ) : (
              <AiChat
                key={index}
                message={message.text}
                idUser={idUserSession}
                loading={isLoading}
                isLastAIChat={index === messages.length - 1}
              />
            )}
          </div>
        ))}

        {isLoading && <LoadingComponent />}
        <div ref={messagesEndRef} />
      </div>
      <div className="container mx-auto w-full p-4 shadow-sm">
        <form onSubmit={handleForm}>
          <div className="relative flex gap-x-2 justify-between items-center">
            <input
              type="text"
              id="message"
              disabled={isLoading}
              name="message"
              className="block shadow-md w-full pr-20 rounded-full border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900"
              placeholder="Masukkan pesan anda.."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-full bg-mainColor px-4 py-4 text-sm font-medium text-white shadow-md transition duration-300 hover:bg-hoverBtn"
            >
              <IoIosSend size={15} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
