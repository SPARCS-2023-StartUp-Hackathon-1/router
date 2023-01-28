import React from "react";
import PhotoBox from "components/common/PhotoBox";
import ProfileImg from "components/common/ProfileImg";
import PinImg from "static/assets/Pin.png";

const CurrentTravel = () => {
  return (
    <PhotoBox height={228}>
      <img
        src={PinImg}
        alt={"pin"}
        style={{ position: "absolute", top: 26, right: -53, width: 110 }}
      />
      <div className="font-text-large">23년 1월 27일 - 현재</div>
      <div className="font-subtitle-large" style={{ margin: "4px 0 8px" }}>
        신나는 대전 여행
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ProfileImg width={32} />
        <ProfileImg width={32} margin="0 0 0 -8px" />
        <ProfileImg width={32} margin="0 0 0 -8px" />
        <div className="font-text-small" style={{ marginLeft: 12 }}>
          지금까지 <u>8</u>개의 핀이 기록되었어요
        </div>
      </div>
    </PhotoBox>
  );
};

export default CurrentTravel;
