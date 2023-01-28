import React from "react";
import PhotoBox from "components/common/PhotoBox";
import ProfileImg from "components/common/ProfileImg";
import PinImg from "static/assets/Pin.png";

const HomeScreen = () => {
  const styleContainer = {
    paddingTop: 12,
  };
  const styleTitle = {
    fontWeight: 400,
    marginBottom: 16,
  };
  return (
    <div style={styleContainer}>
      <div className="font-subtitle-large" style={styleTitle}>
        안녕하세요, <b>사용자</b> 님!
        <br />
        이번 여행은 어떻게 보내고 계신가요?
      </div>
      <PhotoBox>
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
            지금까지 8개의 핀이 기록되었어요
          </div>
        </div>
      </PhotoBox>
    </div>
  );
};

export default HomeScreen;
