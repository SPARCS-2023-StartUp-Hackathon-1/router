import React from "react";

const Input = (props) => {
  const styleInputGrid = {
    margin: "auto 0 60px",
    width: 262,
    color: "var(--red)",
    display: "grid",
    rowGap: "33px",
  };
  const styleInput = {
    display: "grid",
    rowGap: "5px",
  };
  return (
    <div style={styleInputGrid}>
      <div style={styleInput}>
        <div className="font-subtitle-small">아이디</div>
        <input
          className="font-text-large"
          value={props.loginId}
          onChange={(e) => props.onChangeLoginId(e.target.value)}
        />
      </div>
      <div style={styleInput}>
        <div className="font-subtitle-small">비밀번호</div>
        <input
          type="password"
          className="font-text-large"
          value={props.loginPw}
          onChange={(e) => props.onChangeLoginPw(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Input;
