import { TChatProps } from "../utils/types/chat.type";
import ai from "../assets/image.jpg";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";

export const AiChat = ({
  message,
}: TChatProps & {
  isLastAIChat: boolean;
}) => {
  const [displayedMessage, setDisplayedMessage] = useState("");

  useEffect(() => {
    if (typeof message !== "string") {
      return;
    }

    setDisplayedMessage("");
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= message.length) {
        setDisplayedMessage(message.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 5);

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
