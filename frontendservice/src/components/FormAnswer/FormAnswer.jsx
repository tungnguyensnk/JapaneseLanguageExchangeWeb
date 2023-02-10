import React from "react";
import "./FormAnswer.css";
import Bookmark from "../Bookmark/Bookmark";
import Icon from "../Icon/Icon";
import Avatar from "../Avatar/Avatar";
const FormAnswer = (props) => {
  const { fullName, userName, datetime, comment } = props;
  return (
    <div>
      <div className="faq-comment-header">
        BÌNH LUẬN
        <hr className="faq-comment__underline"></hr>
      </div>
      <div className="faq-input-border">
        <div className="faq-input-border__in">
          {/* {props.children} */}
          <div className="faq-post__avatar col-span-1">
            <Avatar />
          </div>
          <textarea
            className="faq-input-comment"
            name="contents"
            id=""
            placeholder="Viết bình luận....."
            rows="5"
          ></textarea>
        </div>
        <button className="faq-button-comment">Bình luận</button>
      </div>
    </div>
  );
};

export default FormAnswer;
