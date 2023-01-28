import React, { useState } from "react";
import Button from "components/common/Button";
import Input from "./Input";
import Circle from "components/common/Circle";

import axios from "utils/axios";

const LoginScreen = () => {
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  const onClickLogin = () => {
    if (loginId === "" || loginPw === "") {
      return alert("아이디와 비밀번호를 입력해주세요.");
    }
  };
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
  return (
    <>
      <div style={styleContainer}>
        <Circle size={476} top={-346} left={-149} />
        <Circle size={394} top={-380} right={-168} />
        <Circle size={394} bottom={-278} right={-111} />
        <div style={{ color: "var(--red)", textAlign: "center" }}>
          <div className="font-logo-large">ROUTER</div>
          <div className="font-text-large">routes taken, memories retraced</div>
        </div>
        <Input
          loginId={loginId}
          loginPw={loginPw}
          onChangeLoginId={setLoginId}
          onChangeLoginPw={setLoginPw}
        />
        <Button
          type="primary"
          className="font-subtitle-small"
          width={262}
          padding="16px 0 20px"
          radius={30}
          style={{ marginBottom: 12 }}
          onClick={onClickLogin}
        >
          로그인
        </Button>
        <Button type="underline">회원가입</Button>
      </div>
    </>
  );
};

export default LoginScreen;
