import React from "react";
import Icon from "../Icon/Icon";
import "./PostScript.css"
const PostScript = (props) => {
  const { title, tags, description } = props;

  return (
    <div className="faq-post-ovv grid-cols-10 gap-14">
      <div className="faq-header-blog">
        <span className="faq-title-blog">{title}</span>
        <div className="faq-tags-and-menu">
          <div className="faq-post-ov__tags">
            {tags?.map((tag, i) => (
              <span className="faq-post-ov__tag" key={i}>{tag}</span>
            ))}
          </div>
          <div>
            <Icon name="menu" sizeText="medium" />
          </div>
        </div>
      </div>
      <div className="faq-description">
        <span className="">{description}</span>
      </div>
    </div>
  );
};

export default PostScript;
