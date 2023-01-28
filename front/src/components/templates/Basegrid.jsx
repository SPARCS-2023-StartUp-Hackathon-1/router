import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";

const BaseGrid = ({ children }) => {
  const styleGrid = {
    width: "100%",
    height: "100%",
    maxWidth: 430,
    margin: "auto",
    position: "relative",
    padding: "0 24px",
    boxSizing: "border-box",
    // height: "calc(100% - env(safe-area-inset-bottom))",
    // paddingTop: "env(safe-area-inset-top)",
    paddingBottom: "calc(56px + env(safe-area-inset-bottom))",
    overflowX: "hidden",
  };
  if (useLocation().pathname.startsWith("/login"))
    return <div style={styleGrid}>{children}</div>;
  return (
    <>
      <div style={styleGrid}>
        <Header />
        {children}
      </div>
      <Navigation />
    </>
  );
};

export default BaseGrid;
