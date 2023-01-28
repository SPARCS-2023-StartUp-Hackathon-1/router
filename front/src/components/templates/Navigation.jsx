import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FlightLandRoundedIcon from "@mui/icons-material/FlightLandRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const Navigation = () => {
  const styleContainer = {
    position: "fixed",
    left: "0px",
    bottom: "0px",
    width: "100%",
    height: "calc(56px + max(env(safe-area-inset-bottom), 12px))",
    backgroundColor: "var(--red)",
  };
  const styleNavigation = {
    width: "min(430px, 100%)",
    margin: "auto",
    display: "flex",
    height: "56px",
  };
  return (
    <div style={styleContainer}>
      <div style={styleNavigation}>
        <NavigationMenu text="홈" page="/" />
        <NavigationMenu text="지난 여행" page="/travel" />
        <NavigationMenu text="여행 추가" page="/add" />
        <NavigationMenu text="프로필 " page="/profile" />
      </div>
    </div>
  );
};

const NavigationMenu = ({ text, page }) => {
  const selected = useLocation().pathname.startsWith(page);
  const styleBox = {
    width: "25%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textDecoration: "unset",
  };
  const styleIcon = {
    fontSize: "24px",
    marginTop: "12px",
    fill: "var(--white)",
    opacity: selected ? "1" : "0.5",
  };
  const styleText = {
    marginTop: "6px",
    width: "fit-content",
    color: "var(--white)",
    opacity: selected ? "1" : "0.5",
  };

  const getIcon = (page) => {
    switch (page) {
      case "/":
        return <HomeRoundedIcon style={styleIcon} />;
      case "/travel":
        return <FlightLandRoundedIcon style={styleIcon} />;
      case "/add":
        return <AddRoundedIcon style={styleIcon} />;
      case "/profile":
        return <AccountCircleRoundedIcon style={styleIcon} />;
      default:
        return <></>;
    }
  };

  return (
    <Link to={page} style={styleBox}>
      {getIcon(page)}
      <div className="font-text-small" style={styleText}>
        {text}
      </div>
    </Link>
  );
};

export default Navigation;
