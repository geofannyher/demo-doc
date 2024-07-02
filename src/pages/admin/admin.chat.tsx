import { useEffect, useRef, useState } from "react";
import { LuArrowDown } from "react-icons/lu";
import { getIdSession } from "../../services/supabase/session.service";
import { notification } from "antd";
import { getHistoryChats } from "../../services/api/history.service";

const AdminChat = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [api, context] = notification.useNotification();

  const getIdUser = async () => {
    const resses = await getIdSession();
    if (resses?.status == 200) {
      fetchChatHistory();
    } else {
      api.error({ message: "Gagal mendapatkan id user" });
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      if (
        "scrollBehavior" in document.documentElement.style &&
        window.innerWidth > 768
      ) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const fetchChatHistory = async () => {
    try {
      setLoading(true);
      const res = await getHistoryChats();
      setChatHistory(res?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getIdUser();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSearch = (event: any) => {
    setSearchKeyword(event.target.value);
  };

  const renderHighlightedText = (text: string) => {
    if (!searchKeyword.trim()) return text;

    const regex = new RegExp(`(${searchKeyword.trim()})`, "gi");
    const parts = text.split(regex);

    return parts.map((part: string, index: number) => {
      if (regex.test(part)) {
        return (
          <span
            key={index}
            className="bg-mainColor text-white rounded-md border p-1"
          >
            {part}
          </span>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  const filteredChatHistory = chatHistory.filter((message) =>
    message.text.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="flex h-[100dvh] flex-col bg-white">
      {context}
      <div className="container mx-auto p-4">
        <h3 className="font-semibold">History Admin</h3>
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearch}
          placeholder="Cari chat..."
          className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>
      <div className="hide-scrollbar container mx-auto flex-1 space-y-2 overflow-y-auto p-4">
        {loading ? (
          <p className="text-gray-500 text-center mt-4">Loading...</p>
        ) : filteredChatHistory.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">
            Tidak ada hasil chat yang cocok.
          </p>
        ) : (
          filteredChatHistory.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  message.sender === "user" ? "mr-2" : "ml-2"
                } bg-gray-300`}
              >
                <div className="text-sm font-semibold">
                  ID User : {message?.localid}
                  <br />
                </div>
                {renderHighlightedText(message.text)}
                <div className="text-sm font-semibold">
                  <br />
                  {message?.konteks && message?.konteks}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <button
        onClick={scrollToBottom}
        className="fixed bottom-10 right-10 bg-mainColor hover:bg-red-500 transition duration-500 hover:scale-105 text-white px-4 py-2 rounded-full shadow-lg"
      >
        <LuArrowDown />
      </button>
    </div>
  );
};

export default AdminChat;
