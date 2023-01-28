import React from "react";
import PhotoBox from "components/common/PhotoBox";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const PastTravel = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="font-text-large">지난 여행 돌아보기</div>
        <KeyboardArrowRightRoundedIcon style={{ cursor: "pointer" }} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "12px 0",
          rowGap: 12,
        }}
      >
        <PhotoBox />
        <PhotoBox />
        <PhotoBox />
      </div>
    </>
  );
};

export default PastTravel;
