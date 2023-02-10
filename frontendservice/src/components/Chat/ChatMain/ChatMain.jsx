import React, {useEffect, useRef, useState} from "react";
import Icon from "../../Icon";
import "./ChatMain.css";
import InputMessage from "../../Input/InputMessage/InputMessage";

export default function ChatMain({ messages, fnHandleMessage }) {
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if(!inputMessage.trim().length) return;
    document.querySelector(".faq-msg input").value = '';

    const data = inputMessage;
    setInputMessage("");

    fnHandleMessage((old) => [...old, { from: "me", text: data }]);

    setTimeout(() => {
      fnHandleMessage((old) => [...old, { from: "computer", text: data.split("").reverse().join("") }]);
    }, 1000);
  }

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current?.scrollIntoView());
    return <div ref={elementRef} />;
  }

 return (
   <div className="faq-cm">
     <div className="faq-cm__header">
       <p className="faq-cm__username">Zenos</p>
       <div className="faq-cm__utils">
        <Icon name="setting" sizeText="medium" color="var(--color-gray-zero--)" />
        <Icon name="arrow_down" sizeText="medium" color="var(--color-gray-zero--)" />
       </div>
     </div>

     <div className="faq-cm__flow">
       {
         messages &&
         messages.map((m, i) =>
           (<p key={`m${i}`} className={`faq-message faq-message__${m.from === 'me' ? 'me' : 'friend'}`} style={{width: m.text.length <= 10 ? m.text.length + 100 : m.text.length * 12 }}>{m.text}</p>)
         )
       }
      <AlwaysScrollToBottom />
     </div>

     <div className="faq-cm__toolbar">
       <div className="faq-cm__input">
         <InputMessage inputMessage={inputMessage} fnGetMessage={setInputMessage} fnSendMessage={handleSendMessage} />
       </div>
       <div className="faq-cm__photo">
         <Icon name="camera" sizeText="big" color="var(--color-gray-tertiary--)" />
       </div>
       <div className="faq-cm__send" onClick={handleSendMessage}>
         <Icon name="send" sizeText="big" color={inputMessage ? "var(--color-blue-secondary--)" : "var(--color-gray-tertiary--)"} />
       </div>
     </div>
   </div>
 );
}
