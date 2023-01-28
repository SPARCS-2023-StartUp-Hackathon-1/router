import React from "react";

const GrayBox = ({ width, height, radius = 16, padding, style, children }) => {
  const styleBox = {
    width: width,
    minWidth: width,
    height: height ? height : width,
    borderRadius: radius,
    backgroundColor: "var(--gray-f3)",
    position: "relative",
    padding: padding,
    boxSizing: "border-box",
    cursor: "pointer",
    ...style,
  };
  return <div style={styleBox}>{children}</div>;
};

export default GrayBox;
