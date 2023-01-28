import { margin } from "@mui/system";
import React, { useState, useEffect } from "react";
import { getS3Url } from "tools/image";

// import defaultImg from "static/assets/profileImgOnError.png";

const ProfileImg = ({ path, width, margin }) => {
  // const getSrc = () => getS3Url(`/profile-img/${path}`);
  // const [src, setSrc] = useState(getSrc());

  // useEffect(() => {
  //   setSrc(getSrc());
  // }, [path]);

  return (
    <div
      style={{
        border: "1px solid var(--white)",
        width: width,
        height: width,
        margin: margin,
        position: "relative",
        borderRadius: "50%",
        backgroundColor: "var(--gray-c)",
      }}
    >
      <img
        // src={src}
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover",
        }}
        alt={`/profile-img/${path}`}
        // onError={() => setSrc(defaultImg)}
      />
    </div>
  );
};

export default ProfileImg;
