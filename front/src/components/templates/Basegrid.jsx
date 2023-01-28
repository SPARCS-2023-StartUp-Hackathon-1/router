import React, { useEffect } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import { useLocation, Navigate, useNavigation } from "react-router-dom";
import axios from "utils/axios";

import { useRecoilState } from "recoil";
import loginInfoAtom from "recoil/logininfo/atom";

const BaseGrid = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoAtom);
  const navigation = useNavigation();
  useEffect(() => {
    const f = async () => {
      if (loginInfo === null) {
        const loginInfoRes = await axios.get("/auth/logininfo");
        if (loginInfoRes.status !== 200 || !loginInfoRes.data?.id)
          window.location.href = "/login";
        setLoginInfo(loginInfoRes.data);
      }
    };
    if (pathname.startsWith("/login")) return;
    f();
  }, [JSON.stringify(loginInfo)]);

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
    paddingBottom: "calc(56px + 24px + env(safe-area-inset-bottom))",
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
