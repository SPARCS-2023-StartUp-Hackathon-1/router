import React from "react";
import CurrentTravel from "./CurrentTravel";
import TravelMenu from "./TravelMenu";
import PastTravel from "./PastTravel";

const HomeScreen = () => {
  const styleTitle = {
    fontWeight: 400,
    marginBottom: 16,
  };
  return (
    <div style={{ paddingTop: 12 }}>
      <div className="font-subtitle-large" style={styleTitle}>
        안녕하세요, <b>사용자</b> 님!
        <br />
        이번 여행은 어떻게 보내고 계신가요?
      </div>
      <CurrentTravel />
      <TravelMenu />
      <PastTravel />
    </div>
  );
};

export default HomeScreen;
