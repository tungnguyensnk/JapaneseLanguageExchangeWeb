import React from "react";
import { FcSearch } from "react-icons/fc";
import "./InputSearch.css";

export default function () {
 return (
  <div className="faq-search">
    <input type="text" className="" placeholder="Tên post, người dùng..."/>
    <FcSearch style={{
      position: 'absolute',
      fontSize: '20px',
      top: '50%',
      right: 0,
      transform: 'translate(-50%, -50%)'
    }} />
  </div>
 );
}
