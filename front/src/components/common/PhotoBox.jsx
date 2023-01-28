import React, { useState, useEffect } from "react";

// import { getS3Url } from "tools/image";

const PhotoBox = ({ path, width, height = 100, children }) => {
  const styleBox = {
    width: width,
    height: height,
    borderRadius: 16,
    backgroundColor: "var(--gray-d)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "0 20px 16px",
    color: "var(--white)",
    zIndex: -2,
    cursor: "pointer",
  };
  //   const getSrc = () => getS3Url(`/profile-img/${path}`);
  //   const [src, setSrc] = useState(getSrc());
  return (
    <div style={styleBox}>
      {children}
      <img
        // src={src}
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
    </div>
  );
};

export default PhotoBox;
