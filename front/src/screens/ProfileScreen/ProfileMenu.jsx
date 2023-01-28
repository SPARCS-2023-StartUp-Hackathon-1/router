import React from "react";
import GrayBox from "components/common/GrayBox";

const ProfileMenu = () => {
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
    fontWeight: 700,
    position: "absolute",
    bottom: 12,
    right: 12,
  };
  return (
    <div style={styleGrid}>
      <div style={styleInnerGrid}>
        <GrayBox width={128} padding={12}>
          <div className="font-text-large">함께 여행할</div>
          <b className="font-text-large">친구</b>
          <span style={styleEmoji}>7</span>
        </GrayBox>
        <GrayBox width={128} padding={12}>
          <div className="font-text-large">지금까지</div>
          <b className="font-text-large">다녀온 여행</b>
          <span style={styleEmoji}>8</span>
        </GrayBox>
        <GrayBox width={128} padding={12}>
          <div className="font-text-large">지금까지</div>
          <b className="font-text-large">내가 만든 여행</b>
          <span style={styleEmoji}>4</span>
        </GrayBox>
      </div>
    </div>
  );
};

export default ProfileMenu;
