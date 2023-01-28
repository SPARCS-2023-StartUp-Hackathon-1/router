import React from "react";
import FlagImg from "static/assets/Flag.png";

const Name = ({ info, setInfo }) => {
  const styleInnerGrid = {
    position: "absolute",
    columnGap: 12,
    display: "flex",
    top: 580,
    left: "calc(50% - 113px)",
  };

  return (
    <div
      style={{
        position: "relative",
        marginTop: "calc(30px + env(safe-area-inset-top))",
      }}
    >
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
      <div style={styleInnerGrid}>
        <div
          className="font-text-large"
          style={{ margin: "2px", color: "var(--red)" }}
        >
          지금 진행 중인 여행이에요
        </div>
        <input type="checkbox" id="toggle" hidden />

        <label for="toggle" class="toggleSwitch">
          <span class="toggleButton"></span>
        </label>
      </div>
    </div>
  );
};

export default Name;
