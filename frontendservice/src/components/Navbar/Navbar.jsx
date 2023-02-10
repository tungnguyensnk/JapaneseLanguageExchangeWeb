import React, {useState} from "react";
import "./Navbar.css";
import Button from "../Button/Button";

export default function () {
  const [selected, setSelected] = useState(true);

  const handleSelected = e => {
    if(e.target.nodeName === 'NAV') return;
    document.querySelectorAll('.faq-navbar__nav').forEach(link => link.classList.remove('faq-navbar__nav--selected'));
    e.target.parentElement.classList.add('faq-navbar__nav--selected');
  }

  return (
    <div className="faq-navbar w-full h-16  ">
      <nav className="m-auto h-full w-3/4 lg:w-3/4 xl:w-1/2 flex items-center justify-around" onClick={e => handleSelected(e)}>
        <div className="faq-navbar__nav faq-navbar__nav--selected">
          <p>Mới nhất</p>
        </div>
        <div className="faq-navbar__nav">
          <p>Đang theo dõi</p>
        </div>
        <div className="faq-navbar__nav">
          <p>Blog</p>
        </div>
        <div className="faq-navbar__nav">
          <p>Bookmark của tôi</p>
        </div>
        <Button icon="pen" value="VIẾT BÀI" bgColor="var(--color-blue-primary--)" iconColor="var(--color-black--)" />
      </nav>
    </div>
  );
}
