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
<<<<<<< HEAD
    <div style={{ paddingTop: 110 }}>
=======
    <div style={{ paddingTop: 12 }}>
>>>>>>> 3bdaf81dcc97bd099b4910ec6182872f7938a903
      <div className="font-subtitle-small" style={styleTitle}>
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
