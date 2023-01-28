import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const styleContainer = {
    width: "100%",
    height: 32,
    paddingTop: "calc(env(safe-area-inset-top))",
  };
  return (
    <div style={styleContainer}>
      <div className="font-logo-small" style={{ margin: "1px 0 2px" }}>
        ROUTER
      </div>
    </div>
  );
};

export default Header;
