import React from "react";
import { Link } from "react-router-dom";
import "./login.css"; // CSS 별도 분리

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h3 className="login-title">아이디</h3>
        <input
          className="login-input"
          type="text"
          placeholder="아이디를 입력해주세요."
        />

        <h3 className="login-title">비밀번호</h3>
        <input
          className="login-input"
          type="password"
          placeholder="비밀번호를 입력해주세요.."
        />

        <button className="login-button">로그인</button>

        <Link to="/join" className="join-link">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default Login;
