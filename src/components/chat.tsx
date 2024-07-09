import { TChatProps } from "../utils/types/chat.type";
import ai from "../assets/image.jpeg";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
// import { TUploadFileProps } from "../utils/types/uploadFile.type";
import { submitData } from "../lib/uploadData";

export const AiChat = ({
  message,
  isLastAIChat,
}: TChatProps & {
  isLastAIChat: boolean;
  // onFileUploadSuccess: ({ msg, fileUrl }: TUploadFileProps) => void;
}) => {
  const [displayedMessage, setDisplayedMessage] = useState("");

  useEffect(() => {
    if (typeof message !== "string") {
      return;
    }

    // Hapus bagian JSON yang dimulai dengan #record# dan diakhiri dengan #/record#
    let cleanedMessage = message
      .replace(/#record1#.*?#\/record1#/gs, "")
      .replace(/#record2#.*?#\/record2#/gs, "")
      .replace("Berikut adalah data laporan Anda dalam format JSON:", "");

    cleanedMessage = cleanedMessage
      .replace(
        "#upload#",
        "silahkan unggah berkas anda melalui menu attach di kiri bawah"
      )
      .replace("#record1#", "")
      .replace("#record2#", "");

    setDisplayedMessage("");
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= cleanedMessage.length) {
        setDisplayedMessage(cleanedMessage.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 5);

    if (isLastAIChat && message.includes("#record2#")) {
      submitData({ detail_laporan: message });
    }

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="flex justify-start py-2">
      <div className="flex items-start">
        <div className="flex gap-2 items-start ">
          <img
            src={ai}
            className="h-10 w-10 items-center justify-center rounded-full object-cover"
          />
          <div
            style={{ whiteSpace: "pre-line" }}
            className="w-auto max-w-2xl rounded-br-xl rounded-tl-xl overflow-auto rounded-tr-xl bg-chatAi p-4 shadow-sm"
          >
            <Markdown
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} style={{ color: "blue" }} />
                ),
              }}
              remarkPlugins={[remarkGfm]}
            >
              {displayedMessage}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserChat = ({ message }: TChatProps) => {
  return (
    <div className="flex justify-end py-2">
      <div className="w-auto  max-w-xs rounded-bl-xl rounded-tl-xl rounded-tr-xl bg-mainColor p-4 text-white shadow-sm">
        <p>{message}</p>
      </div>
    </div>
  );
};

export const AdminHIstoryChat = ({ message }: TChatProps) => {
  return (
    <div className="flex justify-start py-2">
      <div className="flex items-start">
        <div className="flex gap-2 items-start">
          <img
            src={ai}
            className="h-10 w-10 items-center justify-center rounded-full object-cover"
          />
          <div
            style={{ whiteSpace: "pre-line" }}
            className="w-auto max-w-2xl rounded-br-xl rounded-tl-xl text-sm overflow-auto rounded-tr-xl bg-chatAi p-4 shadow-sm"
          >
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};
