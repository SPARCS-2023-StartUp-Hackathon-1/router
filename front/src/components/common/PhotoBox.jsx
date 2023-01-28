import React, { useState, useEffect } from "react";

import { getS3Url } from "tools/image";

const PhotoBox = ({ path, width, height = 100, children, href }) => {
  const styleBox = {
    width: width,
    height: height,
    borderRadius: 16,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "0 20px 16px",
    color: "var(--white)",
    cursor: "pointer",
    zIndex: 0,
    textDecoration: "none",
  };
  const getSrc = () => getS3Url(`/image-ori/${path}`);
  const [src, setSrc] = useState(getSrc());
  return (
    <a style={styleBox} href={href}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "var(--gray-d)",
          borderRadius: 16,
          zIndex: -2,
        }}
      />
      {children}
      <img
        src={src}
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 16,
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)",
          zIndex: -1,
        }}
        alt={`/profile-img/${path}`}
      />
    </a>
  );
};

export default PhotoBox;
