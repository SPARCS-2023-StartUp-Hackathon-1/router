import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import { useLocation, Navigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import loginInfoAtom from "recoil/logininfo/atom";

const BaseGrid = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const loginInfo = useRecoilValue(loginInfoAtom);

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

  if (!pathname.startsWith("/login") && !loginInfo) {
    return <Navigate to="/login" replace />;
  }
  if (pathname.startsWith("/login"))
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
