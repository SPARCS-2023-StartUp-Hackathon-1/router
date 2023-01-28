import React from "react";
import PhotoBox from "components/common/PhotoBox";

const TravelScreen = () => {
  return (
    <div style={{ paddingTop: 30 }}>
      <div className="font-title-large">지난 여행</div>
      <div style={{ margin: "8px 0 24px", color: "var(--red)" }}>
        총 <b style={{ textDecoration: "underline" }}>8</b>
        건의 여행이 있어요
      </div>
      <input className="font-text-large" placeholder="여행 검색하기"></input>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 36,
          rowGap: 12,
        }}
      >
        <PhotoBox />
        <PhotoBox />
        <PhotoBox />
      </div>
    </div>
  );
};

export default TravelScreen;
