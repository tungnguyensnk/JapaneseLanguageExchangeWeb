import React from "react";
import "./NewestQuestion.css";
import Icon from "../Icon/Icon";

export default function ({ title, likes, fullName, comments, views }) {

  return (
    <div className="faq-newest-qt">
      <div className="faq-newest-qt__item mt-5 pb-4 border-gray-400">
        <p className="faq-newest-qt__title">{title}</p>
        <div className="faq-post-ov__reacts flex gap-4">
          <span className="faq-post-ov__likes flex items-center">
            <Icon name="like" sizeText="small" />
            {likes}
          </span>
          <span className="faq-post-ov__views flex items-center">
            <Icon name="view" sizeText="small" />
            {views}
          </span>
          <span className="faq-post-ov__comments flex items-center">
            <Icon name="comment" sizeText="small" />
            {comments}
          </span>
        </div>
        <p className="faq-newest-qt__name">{fullName}</p>
      </div>
    </div>
  );
}
