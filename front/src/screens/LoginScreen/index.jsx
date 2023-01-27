import React from "react";
import Button from "components/common/Button";
import Input from "./Input";

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
const styleCircle1 = {
  position: "absolute",
  top: -149,
  left: -146,
  width: 476,
  height: 476,
  borderRadius: "50%",
  border: "solid 1px var(--red)",
};
const styleCircle2 = {
  position: "absolute",
  top: -180,
  right: -168,
  width: 394,
  height: 394,
  borderRadius: "50%",
  border: "solid 1px var(--red)",
};
const styleCircle3 = {
  position: "absolute",
  bottom: -109,
  left: 107,
  width: 394,
  height: 394,
  borderRadius: "50%",
  border: "solid 1px var(--red)",
};

const LoginScreen = () => {
  return (
    <>
      <div style={styleCircle1} />
      <div style={styleCircle2} />
      <div style={styleCircle3} />
      <div style={styleContainer}>
        <div style={{ color: "var(--red)", textAlign: "center" }}>
          <div className="font-logo">ROUTER</div>
          <div className="font-text">routes taken, memories retraced</div>
        </div>
        <Input />
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
    </>
  );
};

export default LoginScreen;
