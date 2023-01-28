import React from "react";
import ManImg from "static/assets/Man.png";

const Accompany = () => {
  return (
    <div style={{ position: "relative" }}>
      <img
        src={ManImg}
        alt={"camera"}
        style={{
          position: "absolute",
          top: 120,
          left: -200,
          width: 700,
          zIndex: -1,
        }}
      />
      <div className="font-title-large">
        이번 여행의 동행자를
        <br /> 추가해 주세요.
      </div>
      <div
        className="font-subtitle-small"
        style={{ margin: "32px 0 4px", color: "var(--red)" }}
      >
        동행자 검색
      </div>
      <input
        className="font-text-large"
        placeholder="동행자의 이름을 입력해주세요"
      />
    </div>
  );
};

export default Accompany;
