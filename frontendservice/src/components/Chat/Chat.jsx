import React, {useState} from "react";
import ChatListFriend from "./ChatListFriend/ChatListFriend";
import "./Chat.css"
import ChatMain from "./ChatMain/ChatMain";
export default function Chat() {
  const [messages, setMessages] = useState([
    { from: "computer", text: "Hi, My Name is HoneyChat" },
    { from: "me", text: "Hey there" },
    { from: "me", text: "Myself Ferin Patel" },
    {
      from: "computer",
      text: "Nice to meet you. You can send me message and i'll reply you with same message.",
    },
  ]);

  return (
    <div className="faq-chat">
      <ChatListFriend />
      <ChatMain messages={messages} fnHandleMessage={setMessages} />
    </div>
  );
}
