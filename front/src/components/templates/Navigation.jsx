import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navigation = () => {
  const styleContainer = {
    position: "fixed",
    left: "0px",
    bottom: "0px",
    width: "100%",
    height: "calc(56px + env(safe-area-inset-bottom))",
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
  const selected = useLocation().pathname.startsWith("/" + page);
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
    // transition: `fill ${theme.duration}`,
    // fill: styleColor,
  };
  const styleText = {
    marginTop: "6px",
    width: "fit-content",
    // transitionDuration: theme.duration,
    color: "var(--white)",
    opacity: selected ? "1" : "0.5",
  };

  //   const getIcon = (type: PageType) => {
  //     switch (type) {
  //       case "home":
  //         return <RoofingRoundedIcon style={styleIcon} />;
  //       case "search":
  //         return <SearchRoundedIcon style={styleIcon} />;
  //       case "addroom":
  //         return <AddRoundedIcon style={styleIcon} />;
  //       case "myroom":
  //         return <SubjectRoundedIcon style={styleIcon} />;
  //       case "mypage":
  //         return <PersonOutlineRoundedIcon style={styleIcon} />;
  //     }
  //   };
  return (
    <Link to={page} style={styleBox}>
      {/* {getIcon(text)} */}
      <div className="font-small-text" style={styleText}>
        {text}
      </div>
    </Link>
  );
};

export default Navigation;
