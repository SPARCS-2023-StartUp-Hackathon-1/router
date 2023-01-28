import React from "react";

const Name = ({ info, setInfo }) => {
  return (
    <div>
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
