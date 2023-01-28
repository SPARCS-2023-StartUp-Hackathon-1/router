import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const Header = () => {
  const navigate = useNavigate();
  const styleContainer = {
    width: "100%",
    height: 32,
    paddingTop: "calc(env(safe-area-inset-top))",
    display: "flex",
    alignItems: "center",
  };
  const path = useLocation().pathname;
  return (
    <div style={styleContainer}>
      {path.startsWith("/create") || path.startsWith("/travel") ? (
        <ArrowBackIosNewRoundedIcon
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <div className="font-logo-small" style={{ margin: "1px 0 2px" }}>
          ROUTER
        </div>
      )}
    </div>
  );
};

export default Header;
