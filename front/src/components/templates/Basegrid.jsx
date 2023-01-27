import React from "react";

const BaseGrid = ({ children }) => {
  const styleGrid = {
    width: "100%",
    height: "100%",
    maxWidth: 430,
    margin: "auto",
    position: "relative",
  };
  return <div style={styleGrid}>{children}</div>;
};

export default BaseGrid;
