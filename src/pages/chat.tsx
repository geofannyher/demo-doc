import React, { useState, FormEvent, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import notificationSound from "../assets/notif.mp3";
import { notification } from "antd";
import { IMessage } from "../utils/interface/chat.interface";
import { chatRes, generateRandomString } from "../services/api/chat.services";
import { AiChat, UserChat } from "../components/chat";
import LoadingComponent from "../components/loader";
import Navbar from "../components/navbar";
const ChatPage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [api, context] = notification.useNotification();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const idUserSession = localStorage.getItem("iduser");
  const randomChar = async () => {
    if (idUserSession === null) {
      const res = await generateRandomString();
      localStorage.setItem("iduser", res);
    }
  };

  useEffect(() => {
    randomChar();
    setTimeout(() => {
      setMessages([
        {
          text: "Halo, bagaimana kabar anda? Perkenalkan saya dari tim sales Telkomsel ingin memastikan apakah Distro Bamboo masih aktif menggunakan layanan Telkomsel?",
          sender: "ai",
        },
      ]);
    }, 700);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input) {
      return api.error({ message: "Kolom pesan tidak boleh kosong" });
    }
    const userMessage = { text: input, sender: "user" };
    const loadingMessage = { isLoading: true };

    setMessages((prevMessages: any) => [
      ...prevMessages,
      userMessage,
      loadingMessage,
    ]);
    setInput("");
    const audio = new Audio(notificationSound);
    audio.play();

    const res: any = await chatRes({
      message: input,
      star: "demotsel2",
      id: idUserSession ? idUserSession : "",
      model: "gpt-4-1106-preview",
    });

    if (res && res?.data?.data) {
      setMessages((prevMessages: any) => {
        return [
          ...prevMessages.filter((m: any) => !m.isLoading),
          { text: res?.data?.data || "AI tidak merespon", sender: "ai" },
        ];
      });
      const audio = new Audio(notificationSound);
      audio.play();
    }
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <Navbar />
      {context}
      <div className="hide-scrollbar flex-grow space-y-2 overflow-y-auto p-4 ">
        {messages.map((message, index) =>
          message?.isLoading ? (
            <LoadingComponent key={index} />
          ) : message?.sender === "user" ? (
            <div key={index}>
              <div ref={messagesEndRef} />

              <UserChat message={message?.text} />
            </div>
          ) : (
            <div key={index}>
              <AiChat message={message?.text} />
              <div ref={messagesEndRef} />
            </div>
          )
        )}
      </div>
      <div className=" w-full p-4 shadow-sm">
        <form onSubmit={handleForm}>
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="block w-full rounded-xl border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900"
              placeholder="Masukkan pesan anda.."
            />
            <button
              type="submit"
              className="absolute bottom-2.5 end-2.5 rounded-lg bg-mainColor px-4 py-2 text-sm font-medium text-white shadow-md transition duration-300 hover:bg-hoverBtn"
            >
              <IoIosSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
