import React from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import "./SimilarPost.css";
const SimilarPost = (props) => {
  const { title, name, views, bookmarks, posts } = props;
  return (
    <div className="faq-item-card">
      <div className="faq-item-card__body">
        <div className="faq-item-card__title">
          <Link>{title}</Link>
        </div>
        <div className="faq-item-card__name">
          <Link>{name}</Link>
        </div>
        <div className="faq-item-card-icon">
          <span className="faq-item-card-icon__views">
            <Icon name="view" sizeText="small" />
            {views}
          </span>
          <span className="faq-item-card-icon__bookmarks">
            <Icon name="bookmark" sizeText="small" />
            {bookmarks}
          </span>
          <span className="faq-item-card-icon__posts">
            <Icon name="comment" sizeText="small" />
            {posts}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SimilarPost;
