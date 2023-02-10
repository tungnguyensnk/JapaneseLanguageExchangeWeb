import React from "react";
import "./Footer.css";
import Heading from "../Heading/Heading";
import Icon from "../Icon/Icon";

import imgGooglePlay from "../../assets/google.png";
import imgAppStore from "../../assets/appstore.png";
import imgQrcode from "../../assets/qrcode.png";

export default function () {
  return (
    <div className="faq-footer w-full">
      <div className="faq-footer__top grid grid-cols-2 pb-5">
        <div className="faq-footer__nav grid grid-cols-2">
          <p className="col-span-2 mb-5"><Heading size="medium" title="TÀI NGUYÊN" /></p>
          <p>Bài viết</p>
          <p>Tổ chức</p>
          <p>Hỏi đáp</p>
          <p>Tác giả</p>
          <p>Thảo luận</p>
          <p>Tags</p>
        </div>
        <div className="faq-footer__app pl-10">
          <Heading size="medium" title="ỨNG DỤNG DI ĐỘNG" />
          <div className="flex gap-5 items-center my-3">
            <div>
              <img style={{ width: 120, marginBottom: 10 }} src={imgGooglePlay} alt="Google play image" />
              <img style={{ width: 120 }} src={imgAppStore} alt="App Store image" />
            </div>
            <div>
              <img style={{ width: 80 }} src={imgQrcode} alt="App Store image" />
            </div>
          </div>
          <Heading size="medium" title="LIÊN KẾT" />
          <div className="faq-footer__media mt-2">
            <ul className="flex items-center gap-4">
              <li><Icon name="facebook" sizeText="medium" /></li>
              <li><Icon name="github" sizeText="medium" /></li>
              <li><Icon name="instagram" sizeText="medium" /></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="faq-footer__bottom flex justify-between mt-5">
        <p>Language</p>
        <p>@ Copyright, 2022 - Team WEB FAQ 	&lt;One Love, One Future&gt;</p>
      </div>
    </div>
  );
}
