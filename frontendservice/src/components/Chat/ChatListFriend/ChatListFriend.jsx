import React, {useState} from "react";
import "./ChatListFriend.css"

import avt1 from "./TestAvatar/bee.png";
import avt2 from "./TestAvatar/dragon.png";
import avt3 from "./TestAvatar/sakura.png";
import avt4 from "./TestAvatar/user.png";
import avt5 from "./TestAvatar/superhero.png";

const listFriends = [
  { avatar: avt1, username: "Songoku", lastestMessage: "konichiha", read: true },
  { avatar: avt2, username: "Superman", lastestMessage: "Oh my god! With all love from heart", read: false },
  { avatar: avt3, username: "Sakura", lastestMessage: "Japan vs Vietnam", read: true },
  { avatar: avt4, username: "NULL", lastestMessage: "Noodytr", read: true },
  { avatar: avt5, username: "Mai Dao Tuan Thanh", lastestMessage: "You: Nope, You are registered in July, 2020", read: false }
];
export default function() {
  const [friendId, setFriendId] = useState('0');

  const handleFriendSelected = (e) => {
    const id = e.target.closest('li').dataset.id;
    setFriendId(id);
  }

  return (
    <div className="faq-clf">
      <div className="faq-clf__header">Chat <span className="faq-clf__count">2</span></div>
      <ul className="faq-clf__list">
        {
          listFriends &&
          listFriends.map((lf, i) => (
            <li
              key={lf.username}
              className={"faq-clf__item " + (i === +friendId ? "faq-clf__item--selected" : "") }
              data-id={i}
              onClick={handleFriendSelected}
            >
              <div className="faq-clf__avatar">
                <img src={lf.avatar} alt="avatar "/>
              </div>
              <div className="faq-clf__user">
                <p className="faq-clf__username" style={{ fontWeight: lf.read ? 700 : 500 }}>{lf.username}</p>
                <p className="faq-clf__lastest" style={{ fontWeight: lf.read ? 600 : 400 }}>{lf.lastestMessage}</p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
