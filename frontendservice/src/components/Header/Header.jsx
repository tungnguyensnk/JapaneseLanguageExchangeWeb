import React from "react";
import faqLogo from "../../assets/icons/japanese.png";
import "./Header.css";
import InputSearch from "../Input/InputSearch/InputSearch";
import Icon from "../Icon/Icon";
import Avatar from "../Avatar/Avatar";
// import MainLayout from "../../layouts/MainLayout"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function Header() {
  return (
    <div className="faq-header grid grid-cols-12 w-3/4 md:w-5/6 m-auto h-16 px-2.5 content-center">
      <div className="faq-logo col-span-2">
        <img src={faqLogo} className="faq-img" alt="faq logo" />
      </div>
      <div className="faq-header__navigation flex justify-around px-4 items-center col-span-4">
        {/* <BrowserRouter>
          <Routes>
            <Route path="/" >
              <div className="faq-header__link">
                <Link to="/">Bài viết</Link>
              </div>
            </Route>
          </Routes>

        </BrowserRouter> */}
        <div className="faq-header__link">
          <Link to="/">Bài viết</Link>
        </div>
        <div className="faq-header__link">
          <Link to="/question">Hỏi đáp</Link>
        </div>
        <div className="faq-header__link">
          <Link to="/videocall">Video call</Link>
        </div>
      </div>
      <div className="faq-header__search col-span-3 flex items-center">
        <InputSearch />
      </div>
      <div className="faq-header__utils col-span-3 pl-5 flex items-center">
        <Icon name="notification" sizeText="medium" />
        <Icon name="message" sizeText="medium" />
        <Icon name="pencil" sizeText="medium" />
        <Link to="/login">
          <Avatar margin="0 0 0 20px" size="small" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
