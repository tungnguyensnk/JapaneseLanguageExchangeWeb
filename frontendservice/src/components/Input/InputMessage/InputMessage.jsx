import React, {useState} from "react";
import "./InputMessage.css";
import Icon from "../../Icon";
import EmojiPicker from "emoji-picker-react";
import {kaomoji} from "../../Chat/kaomoji";

export default function InputMessage({ inputMessage, fnGetMessage, fnSendMessage }) {
  const [hideEmoji, setHideEmoji] = useState(false);
  const [hideKaomoji, setHideKaomoji] = useState(true);
  const [kmjParent, setKmjParent] = useState(Object.values(kaomoji)[0]);
  const [kmjChild, setKmjChild] = useState(Object.values(kmjParent)[1]);
  const [kmjParentSelected, setKmjParentSelected] = useState(Object.keys(kaomoji)[0]);
  const [kmjChildSelected, setKmjChildSelected] = useState(Object.keys(kmjParent)[1]);

  const handleKmjParent = kp => {
    const kmjOuter = kaomoji[kp];
    setKmjParent(kmjOuter);
    setKmjParentSelected(kp);
    setKmjChild(kmjOuter[Object.keys(kmjOuter)[1]]);
    setKmjChildSelected(Object.keys(kmjOuter)[1]);
  }

  const handleKmjChild = kc => {
    setKmjChild(kmjParent[kc]);
    setKmjChildSelected(kc);
  }

  return (
    <div className="faq-msg">
      <input
        type="text" className="faq-input-message" placeholder="Message"
        value={inputMessage}
        onChange={e => fnGetMessage(e.target.value)}
        onKeyDown={e => {if(e.key === 'Enter') fnSendMessage()}}
      />
      <div className="faq-kaomoji">
        <span style={{ opacity: .5 }} onClick={() => setHideKaomoji(!hideKaomoji)}>(^--^)</span>
        {
          hideKaomoji &&
          (
            <div className="faq-kaomoji__box">
              <div className="faq-kaomoji__list">
                { Object.keys(kaomoji).map(
                  (kp, i) => (
                    <div
                      key={'kp' + i} className={"faq-kaomoji__name "  + (kp === kmjParentSelected ? "faq-kaomoji--selected" : "")}
                      title={kp}
                      onClick={() => handleKmjParent(kp)}
                    >
                      <img className="faq-kaomoji__img" src={kaomoji[kp].img} alt="kaomoji icon"/>
                    </div>
                  ))
                }
              </div>
              <div className="faq-kaomoji__types">
                { Object.keys(kmjParent).map(
                  (kc, i) => (
                    kc !== 'img' &&
                    <div
                      key={'kc' + i} className={"faq-kaomoji__type " + (kc === kmjChildSelected ? "faq-kaomoji--selected" : "")}
                      onClick={() => handleKmjChild(kc)}
                    >
                      <img title={kc} className="faq-kaomoji__img" src={kmjParent[kc].img} alt=""/>
                    </div>
                  ))
                }
              </div>
              <div className="faq-kaomoji__wrapper">
                <div className="faq-kaomoji__items__title">
                  {kmjChildSelected}
                </div>
                <div className="faq-kaomoji__items">
                  { kmjChild.icons?.map(ic => (<div key={ic} className="faq-kaomoji__icon" onClick={() => fnGetMessage(inputMessage + ic)}>{ic}</div>)) }
                </div>

              </div>
            </div>
        )}
      </div>
      <div className="faq-msg__emoji">
        <div className="faq-emoji">{
          hideEmoji &&
          <EmojiPicker onEmojiClick={emojiData => fnGetMessage(inputMessage + emojiData.emoji)} />}
        </div>
        <div onClick={() => setHideEmoji(!hideEmoji)}>
          <Icon name="emoji" sizeText="medium" color="var(--color-gray-zero--)" />
        </div>
      </div>
    </div>
  );
}
