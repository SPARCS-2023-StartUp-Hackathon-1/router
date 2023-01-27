import React from "react";
import Button from "components/common/Button";
import Input from "./Input";
import Circle from "components/common/Circle";

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

const LoginScreen = () => {
  return (
    <>
      <Circle size={476} top={-149} left={-146} />
      <Circle size={394} top={-180} right={-168} />
      <Circle size={394} bottom={-109} left={107} />
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
