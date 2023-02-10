import React from "react";
import "./PostAuthor.css";
import Avatar from "../Avatar/Avatar";
import Icon from "../Icon/Icon";

const PostAuthor = (props) => {
  const {
    fullName,
    datetime,
    userName,
    likes,
    views,
    followers,
    questions,
    bookmark,
    posts,
    comments,
  } = props;

  return (
    <div className="faq-post-o grid grid-cols-12 gap-16">
      <div className="faq-post-o__avatar col-span-1">
        <Avatar />
      </div>
      <div className="col-span-10 text-left">
        <span className="faq-post-o__name">{fullName}</span>
        <span className="tag_name">@{userName}</span>
        <button className="btn-follow">
          + Theo dõi
        </button>
        <span className="date_time">{datetime}</span>
        <div className="icon-flex">
          <div className="icon-of-author">
            <span >
              <Icon name="follow" sizeText="small" />
            {followers}
            </span>
            <span>
              <Icon name="question" sizeText="small" />
              {questions}
            </span>
            <span>
              <Icon name="pencil" sizeText="small" />
              {posts}
            </span>
          </div>
          <div className="icon-of-post">
            <span className="">
              <Icon name="view" sizeText="small" />
              {views}
            </span>
            <span>
              <Icon name="bookmark" sizeText="small" />
              {bookmark}
            </span>
            <span>
              <Icon name="comment" sizeText="small" />
              {comments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAuthor;
