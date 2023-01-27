import React from "react";
import Button from "components/common/Button";

const styleContainer = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "476px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
};
const styleInputGrid = {
  margin: "auto 0 60px",
  width: 262,
  color: "var(--red)",
  display: "grid",
  rowGap: "33px",
};
const styleInput = {
  display: "grid",
  rowGap: "3px",
};

const LoginScreen = () => {
  return (
    <div style={styleContainer}>
      <div style={{ color: "var(--red)", textAlign: "center" }}>
        <div className="font-logo">ROUTER</div>
        <div className="font-text">routes taken, memories retraced</div>
      </div>
      <div style={styleInputGrid}>
        <div style={styleInput}>
          <div className="font-subtitle">아이디</div>
          <input className="font-text"></input>
        </div>
        <div style={styleInput}>
          <div className="font-subtitle">비밀번호</div>
          <input type="password" className="font-text"></input>
        </div>
      </div>
      <Button
        type="primary"
        className="font-subtitle"
        width={262}
        padding="16px 0 20px"
        radius={30}
        style={{ marginBottom: 12 }}
      >
        로그인
      </Button>
      <Button type="underline">회원가입</Button>
    </div>
  );
};

export default LoginScreen;
