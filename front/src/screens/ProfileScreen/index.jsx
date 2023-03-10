import React from "react";
import ProfileMenu from "./ProfileMenu";
import loginInfoAtom from "recoil/logininfo/atom";
import { useRecoilValue } from "recoil";

const ProfileScreen = () => {
  const loginInfo = useRecoilValue(loginInfoAtom);
  return (
    <div style={{ marginTop: 110 }}>
      <div className="font-title-large-regular" style={{ marginBottom: 24 }}>
        <b>{loginInfo?.id ?? "μ¬μ©μ"}</b> λ
      </div>
      <ProfileMenu />
      <div style={{ marginTop: 36 }}>π μ΄μ© μ½κ΄ μ½μ΄λ³΄κΈ°</div>
      <div style={{ marginTop: 24 }}>β μλΉμ€ λ¬ΈμνκΈ° </div>
      <div style={{ marginTop: 24 }}>π λ‘κ·Έμμ </div>
    </div>
  );
};

export default ProfileScreen;
