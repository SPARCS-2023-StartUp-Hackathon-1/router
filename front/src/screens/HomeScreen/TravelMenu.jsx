import React from "react";
import GrayBox from "components/common/GrayBox";

const TravelMenu = () => {
  const styleGrid = {
    width: "calc(100% + 48px)",
    height: 128,
    margin: "12px -24px 24px",
    position: "relative",
    overflow: "scroll",
  };
  const styleInnerGrid = {
    position: "absolute",
    columnGap: 12,
    display: "flex",
    top: 0,
    left: 0,
    padding: "0 24px",
  };
  const styleEmoji = {
    fontSize: 32,
    position: "absolute",
    bottom: 12,
    right: 12,
  };
  return (
    <div style={styleGrid}>
      <div style={styleInnerGrid}>
        <GrayBox width={128} padding={12}>
          <div className="font-text-large">기억하고 싶은</div>
          <b className="font-text-large">
            사진
            <br />
            추가하기
          </b>
          <span style={styleEmoji}>📷</span>
        </GrayBox>
        <GrayBox width={128} padding={12}>
          <div className="font-text-large">새롭게</div>
          <b className="font-text-large">
            여행 이름
            <br />
            수정하기
          </b>
          <span style={styleEmoji}>📝</span>
        </GrayBox>
        <GrayBox width={128} padding={12}>
          <div className="font-text-large">함께 여행한</div>
          <b className="font-text-large">
            동행자
            <br />
            변경하기
          </b>
          <span style={styleEmoji}>🤝</span>
        </GrayBox>
      </div>
    </div>
  );
};

export default TravelMenu;
