import React from "react";
import CurrentTravel from "./CurrentTravel";
import TravelMenu from "./TravelMenu";
import PastTravel from "./PastTravel";
import loginInfoAtom from "recoil/logininfo/atom";
import { useRecoilValue } from "recoil";

const HomeScreen = () => {
  const loginInfo = useRecoilValue(loginInfoAtom);
  const styleTitle = {
    fontWeight: 400,
    marginBottom: 16,
  };
  return (
    <div style={{ marginTop: 110 }}>
      <div className="font-subtitle-small" style={styleTitle}>
        안녕하세요, <b>{loginInfo.id ?? "사용자"}</b> 님!
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
