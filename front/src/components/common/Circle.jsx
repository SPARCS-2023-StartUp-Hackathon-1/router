import React from "react";

const Circle = ({ size, top, bottom, left, right }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        aspectRatio: "1 / 1",
        top: top,
        bottom: bottom,
        left: left,
        right: right,
        borderRadius: "50%",
        border: "solid 1px var(--red)",
        zIndex: -1,
      }}
    />
  );
};

export default Circle;
