import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link, Navigate } from "react-router-dom";
import "./Signin.css";
import Icon from "../../components/Icon/Icon";

function Signin() {
  // React States

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

  };

  // Generate JSX code for error message


  // JSX code for login form
  const renderForm = (
    <div className="form-sign">
      <form onSubmit={handleSubmit}>
        <div className="form-signin-container">
          <div className="form-signin-container-detail">
            <input
              className="form-signin-container-detail__input"
              type="text"
              name="name_account"
              placeholder="Tên của bạn"
              required
            />
          </div>
          <div className="form-signin-container-detail">
            <input
              className="form-signin-container-detail__input"
              type="text"
              name="name_account"
              placeholder="Số điện thoại"
              required
            />
          </div>
          <div className="form-signin-container-detail">
            <input
              className="form-signin-container-detail__input"
              type="text"
              name="name_account"
              placeholder="Địa chỉ"
              required
            />
          </div>
          <div className="form-signin-email-account">
            <div className="form-signin-container-detail">
              <input
                className="form-signin-container-detail__input"
                type="text"
                name="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="form-signin-container-detail">
              <input
                className="form-signin-container-detail__input"
                type="text"
                name="name_account"
                placeholder="Tên tài khoản"
              />
            </div>
          </div>

          <div className="form-signin-container-detail">
            <input
              className="form-signin-container-detail__input"
              type="password"
              name="pass"
              placeholder="Mật khẩu"
              required
            />
          </div>

          <div className="form-signin-container-detail">
            <input
              className="form-signin-container-detail__input"
              type="password"
              name="pass"
              placeholder="Xác nhận lại mật khẩu"
              required
            />
          </div>
        </div>
        <div className="button-container">
          {/* <Link className="button-login" to="/"> */}
            <button className="button-login">Đăng ký</button>
          {/* </Link> */}
        </div>
      </form>
    </div>
  );

  return (
    <>
      <div className="wrap-container"></div>
      <div className="app">
        <div className="signin-form">
          <div className="signin-form__webname">FAQ Forum</div>
          <div className="title">Đăng ký</div>
            {renderForm}

          <div className="route-signin">
            <Link to="/login"></Link>
            <Link to="/login">Đăng nhập</Link>
          </div>
          <div className="signin-another-form">
            <hr className="signin-another-form__fill" />
            <span className="signin-another-form__text">Đăng ký bằng</span>
            <hr className="signin-another-form__fill" />
          </div>
          <div className="social-login">
            <ul className="social-login-list">
              <button className="social-login-list__button">
                <Icon name="facebook" sizeText="small" />
                <span>Facebook</span>
              </button>
              <button className="social-login-list__button">
                <Icon name="google" sizeText="small" />
                <span>Google</span>
              </button>
              <button className="social-login-list__button">
                <Icon name="github" sizeText="small" />
                <span>Github</span>
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
