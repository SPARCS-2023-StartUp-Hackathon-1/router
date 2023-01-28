import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const Header = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const styleContainer = {
    ...{
      width: "100%",
      height: 32,
      paddingTop: "calc(env(safe-area-inset-top))",
      display: "flex",
      alignItems: "center",
      position: "fixed",
      zIndex: "10",
    },
    ...(path.startsWith("/create") || path.startsWith("/travel")
      ? {}
      : {
          background: "rgba(255, 255, 255, 0.75)",
          WebkitBackdropFilter: "blur(20px)",
          BackdropFilter: "blur(20px)",
        }),
  };
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
