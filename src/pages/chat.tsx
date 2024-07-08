import React, { useState, useEffect, useRef } from "react";
import { IoIosSend, IoMdAttach } from "react-icons/io";
import { notification } from "antd";
import { IMessage } from "../utils/interface/chat.interface";
import { AiChat, UserChat } from "../components/chat";
import Navbar from "../components/navbar";
import LoadingComponent from "../components/loader";
import { getIdSession } from "../services/supabase/session.service";
import { chatRes } from "../services/api/chat.services";
import notificationSound from "../assets/notif.mp3";
import { getSession } from "../shared/Session";
import { supabase } from "../services/supabase/connection";
import { TUploadFileProps } from "../utils/types/uploadFile.type";
import { scrollToBottom } from "../lib/scrollSmooth";
import axios from "axios";
// import { cleanString } from "../utils/cleanString";
const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [api, context] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [idUserSession, setId] = useState("");
  const session = getSession();
  const [isLastAIChat, setIsLastAIChat] = useState(false); // State untuk mengelola status pesan AI terakhir
  console.log(isLastAIChat);

  const getIdUser = async () => {
    const resses = await getIdSession();
    if (resses?.status == 200) {
      setId(resses?.data?.uuid);
    } else {
      return api.error({ message: "Gagal mendapatkan id user" });
    }
  };

  const handleFileUploadSuccess = async ({
    msg,
    fileUrl,
  }: TUploadFileProps) => {
    if (msg && msg?.data?.data) {
      const aiMessage = msg?.data?.data;

      const error = await supabase
        .from("laporan")
        .insert([{ detail_laporan: aiMessage, bukti_laporan: fileUrl }]);

      if (error) {
        console.error("Error uploading to Supabase:", error);
      }

      setMessages((prevMessages: any) => [
        ...prevMessages,
        { text: aiMessage, sender: "ai" },
      ]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          text: "Halo, Selamat datang di Layanan Aspirasi dan Pengaduan Online Rakyat. Silahkan sampaikan laporan anda.",
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

    const messageInput = event?.target[0]?.value.trim();
    event.target[0].value = "";
    if (!messageInput) {
      return api.error({ message: "Kolom pesan tidak boleh kosong" });
    }

    setIsLoading(true);
    const userMessage = { text: messageInput, sender: "user" };

    setMessages((prevMessages: any) => [...prevMessages, userMessage]);

    const audio = new Audio(notificationSound);
    audio.play();

    const resNew: any = await chatRes({
      message: messageInput,
      star: "ai_lapor",
      id: idUserSession,
      // id: "dev3",
      model: "gpt-4o",
      is_rag: "false",
    });

    // const res = await axios.post(import.meta.env.VITE_APP_CHATT + "history", {
    //   id: idUserSession,
    //   star: "ai_lapor",
    // });

    // const cleanedKonteks = cleanString(res?.data?.data?.history[1]?.content);

    // await supabase.from("chats").upsert([
    //   {
    //     text: messageInput,
    //     sender: "user",
    //     localid: idUserSession,
    //   },
    //   {
    //     text: cleanedKonteks || "AI tidak merespon",
    //     sender: "ai",
    //     konteks: cleanedKonteks,
    //     localid: idUserSession,
    //   },
    // ]);

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

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "ai") {
      setIsLastAIChat(true);
    } else {
      setIsLastAIChat(false);
    }
  }, [messages]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!idUserSession) return api.error({ message: "gagal mendapatkan id" });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "demolapor");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dp8ita8x5/upload",
        formData
      );
      const chatResponse = await chatRes({
        message: "saya sudah upload",
        star: "ai_lapor",
        id: idUserSession,
        // id: "dev3",
        model: "gpt-4o",
        is_rag: "false",
      });
      await handleFileUploadSuccess({
        fileUrl: response?.data?.secure_url,
        msg: chatResponse,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const shouldShowFileUpload = () => {
    if (messages.length === 0) return false;
    const lastMessage = messages[messages.length - 1];
    return lastMessage.sender === "ai" && lastMessage.text.includes("#upload#");
  };
  return (
    <div className="flex h-screen flex-col bg-white">
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
                loading={loading}
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
            {shouldShowFileUpload() && (
              <div className="w-[12%]">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer font-semibold text-xs flex items-center gap-2"
                >
                  <IoMdAttach
                    size={5}
                    className="bg-mainColor w-10 h-10 p-2 shadow-xl rounded-full text-white"
                  />
                  <span className="hidden md:inline">upload lampiran</span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  disabled={loading}
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            )}

            <input
              type="text"
              id="message"
              disabled={loading}
              name="message"
              className="block shadow-md w-full pr-20 rounded-full border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900"
              placeholder="Masukkan pesan anda.."
            />
            <button
              type="submit"
              disabled={loading}
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
