import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./join.css";

function Join() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [idCheckMessage, setIdCheckMessage] = useState(""); // 아이디 체크 메시지

  const handleIdCheck = () => {
    if (!id) {
      setIdCheckMessage("아이디를 입력해주세요!");
      return;
    }

    // ===== 여기서 나중에 실제 API 호출 예정 =====
    // 예시: 백엔드에서 /check-id?id=aaa 이런 식으로 확인
    const existingIds = ["test", "admin", "user1"]; // 가짜 DB 예시

    if (existingIds.includes(id)) {
      setIdCheckMessage("이미 존재하는 아이디입니다!");
    } else {
      setIdCheckMessage("사용 가능한 아이디입니다!");
    }
  };

  const handleJoin = () => {
    if (pw !== pwCheck) {
      setErrorMessage("비밀번호가 일치하지 않습니다!");
      return;
    }

    if (!id || !pw || !pwCheck || !name) {
      setErrorMessage("모든 정보를 입력해주세요.");
      return;
    }

    setErrorMessage("");
    alert("회원가입이 완료되었습니다!");
    navigate("/login");
  };

  return (
    <div className="join-container">
      <div className="join-box">
        <h3 className="join-title">아이디</h3>

        <div className="id-check-wrapper">
          <input
            className="join-input"
            type="text"
            placeholder="아이디를 입력해주세요."
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="id-check-button" onClick={handleIdCheck}>
            중복확인
          </button>
        </div>

        {idCheckMessage && (
          <p className="id-check-message">{idCheckMessage}</p>
        )}

        <h3 className="join-title">비밀번호</h3>
        <input
          className="join-input"
          type="text"
          placeholder="비밀번호를 입력해주세요."
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />

        <h3 className="join-title">비밀번호 확인</h3>
        <input
          className="join-input"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          value={pwCheck}
          onChange={(e) => setPwCheck(e.target.value)}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <h3 className="join-title">이름</h3>
        <input
          className="join-input"
          type="text"
          placeholder="이름을 입력해주세요."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="join-button" onClick={handleJoin}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Join;
