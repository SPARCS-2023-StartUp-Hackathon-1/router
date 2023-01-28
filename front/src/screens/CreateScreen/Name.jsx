import React from "react";
import FlagImg from "static/assets/Flag.png";

const Name = ({ info, setInfo }) => {
  return (
    <div style={{ position: "relative" }}>
      <img
        src={FlagImg}
        alt={"flag"}
        style={{
          position: "absolute",
          top: 152,
          left: -133,
          width: 535,
          zIndex: -1,
        }}
      />
      <div className="font-title-large">
        새로운 여행의 이름을 <br />
        설정해 주세요.
      </div>
      <div
        className="font-subtitle-small"
        style={{ margin: "32px 0 4px", color: "var(--red)" }}
      >
        여행 이름
      </div>
      <input
        className="font-text-large"
        placeholder="Ex. 신나는 대전 여행"
        onChange={(e) => setInfo({ ...info, name: e.target.value })}
      />
    </div>
  );
};

export default Name;
