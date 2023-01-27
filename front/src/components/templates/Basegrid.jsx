import React from "react";
import Navigation from "./Navigation";

const BaseGrid = ({ children }) => {
  const styleGrid = {
    width: "100%",
    height: "100%",
    maxWidth: 430,
    margin: "auto",
    position: "relative",
  };
  return (
    <>
      <div style={styleGrid}>{children}</div>;
      <Navigation />
    </>
  );
};

export default BaseGrid;
