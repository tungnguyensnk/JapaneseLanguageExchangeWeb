import React from "react";
import "./TableOfContent.css";
import { useState, useEffect } from "react";
import Heading from "../../components/Heading/Heading";
const TableOfContent = (props) => {
  const {listContent} = props 
  return (
    <div>
      <div className="flex items-center">
        {props.children}
        <hr className="faq-underline"></hr>
      </div>
      <div className="note-content">
        <div className="note-content-color"></div>
        <span>I. Mở đầu</span>
      </div>
      <p>II. Nội dung</p>
      <p>III. Kết luận</p>
    </div>
  );
};

export default TableOfContent;