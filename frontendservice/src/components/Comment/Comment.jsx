import React from "react";
import "./Comment.css";
import Icon from "../Icon/Icon";
import Avatar from "../Avatar/Avatar";
const Comment = (props) => {
  const { fullName, userName, datetime, comment } = props;
  return (
    <div>           
      {/* -------------------------------comment of user--------------------- */}
      <div className="faq-input-border">
        <div className="faq-input-border__author">
          {/* {props.children} */}
          <div className="faq-post__avatar col-span-1">
            <Avatar />
          </div>
          <div className="faq-info__author">
            <span className="faq-comment__name">{fullName}</span>
            <span className="faq-tag_name">@{userName}</span>
          </div>
        </div>
        <div className="faq-comment__time">
          <span>{datetime}</span>
        </div>
        <div className="faq-comment__author">
          <span>{comment}</span>
        </div>
        <div className="faq-comment-action">
          <span className="faq-comment-action__reply">Trả lời</span>
          <span className="faq-comment-action__share">Chia sẻ</span>
          <div className="faq-comment-action__menu">
            <Icon name="menu" sizeText="medium" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
