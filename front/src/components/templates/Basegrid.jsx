import React from "react";
import Navigation from "./Navigation";

const BaseGrid = ({ children }) => {
  const styleGrid = {
    width: "100%",
    height: "100%",
    maxWidth: 430,
    margin: "auto",
    position: "relative",
    padding: "0 24px",
    boxSizing: "border-box",
  };
  return (
    <>
      <div style={styleGrid}>{children}</div>
      <Navigation />
    </>
  );
};

export default BaseGrid;
