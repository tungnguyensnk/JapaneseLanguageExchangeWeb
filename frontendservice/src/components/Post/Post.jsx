/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import "./Post.css";
import Avatar from "../Avatar/Avatar";
import Icon from "../Icon/Icon";
import { Link } from "react-router-dom";

export default function (props) {
  const {
    avatar,
    fullName,
    datetime,
    content,
    title,
    tags,
    likes,
    views,
    comments,
    isBookmarked,
    followed,
  } = props;

  const [bookmark, setBookmark] = useState(isBookmarked);

  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  return (
    <div className="faq-post-ov grid grid-cols-12 gap-16">
      <div className="faq-post-ov__avatar col-span-1 mt-3">
        <Link to="/blog/1">
          <Avatar />
        </Link>
      </div>
      <div className="faq-post-ov__desc col-span-7 text-left">
        <Link to="/blog/1">
          <span className="faq-post-ov__name">{fullName}</span>
          <span className="faq-post-ov__datetime">{datetime}</span>
          <p className="faq-post-ov__title">{title}</p>
        </Link>
        <div className="faq-post-ov__tags">
          {tags?.map((tag, i) => (
            <span className="faq-post-ov__tag" key={i}>
              {tag}
            </span>
          ))}
        </div>
        <div className="faq-post-ov__content">
          {content}
        </div>
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
      </div>

      <div className="faq-post-ov__bookmark" onClick={handleBookmark}>
        <Icon name={bookmark ? "bookmark" : "bookmarked"} sizeText="medium" />
      </div>
    </div>
  );
}
