import React, { useEffect, useState } from "react";
import PhotoBox from "components/common/PhotoBox";
import ProfileImg from "components/common/ProfileImg";
import PinImg from "static/assets/Pin.png";
import axios from "utils/axios";
import loginInfoAtom from "recoil/logininfo/atom";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const CurrentTravel = () => {
  const [onetrip, setTrip] = useState([]);
  const loginInfo = useRecoilValue(loginInfoAtom);
  useEffect(() => {
    const f = async () => {
      const response = await axios.get(`/user/triplist/${loginInfo.id}`);
      if (response.status === 200) {
        const currTrip = [];
        for (const trip of response.data) {
          if (trip.progress == true) {
            currTrip.push(trip);
          }
        }
        setTrip(currTrip[0]);
      }
    };
    if (loginInfo?.id) f();
  }, [loginInfo]);
  return (
    <PhotoBox
      height={228}
      key={onetrip?._id}
      path={onetrip?.mainImage}
      href={`/travel/${onetrip?._id}`}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <ProfileImg width={32} />
        <ProfileImg width={32} margin="0 0 0 -8px" />
        <ProfileImg width={32} margin="0 0 0 -8px" />
        <div className="font-text-small" style={{ marginLeft: 12 }}>
          지금까지 <u>8</u>개의 핀이 기록되었어요
        </div>
      </div>
    </PhotoBox>
  );
};

export default CurrentTravel;
