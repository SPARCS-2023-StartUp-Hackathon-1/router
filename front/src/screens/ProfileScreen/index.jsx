import React from "react";
import ProfileMenu from "./ProfileMenu";
import loginInfoAtom from "recoil/logininfo/atom";
import { useRecoilValue } from "recoil";

const ProfileScreen = () => {
  const loginInfo = useRecoilValue(loginInfoAtom);
  return (
    <div style={{ marginTop: 110 }}>
      <div className="font-title-large-regular" style={{ marginBottom: 24 }}>
        <b>{loginInfo?.id ?? "사용자"}</b> 님
      </div>
      <ProfileMenu />
      <div style={{ marginTop: 36 }}>📄 이용 약관 읽어보기</div>
      <div style={{ marginTop: 24 }}>❓ 서비스 문의하기 </div>
      <div style={{ marginTop: 24 }}>👋 로그아웃 </div>
    </div>
  );
};

export default ProfileScreen;
