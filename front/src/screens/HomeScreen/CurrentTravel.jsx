import React, { useEffect, useState } from "react";
import PhotoBox from "components/common/PhotoBox";
import ProfileImg from "components/common/ProfileImg";
import PinImg from "static/assets/Pin.png";
import axios from "utils/axios";
import loginInfoAtom from "recoil/logininfo/atom";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const CurrentTravel = () => {
  const [trips, setTrips] = useState([]);
  const loginInfo = useRecoilValue(loginInfoAtom);
  const [date, setDate] = useState("");
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
        console.log(currTrip[0].name);
        console.log(currTrip[0].startTime);
        setTrips(currTrip);
      }
    };
    if (loginInfo?.id) f();
  }, [loginInfo]);
  return (
    <>
      {trips.slice(0, 1).map((trip) => {
        const date = trip.startTime.split("T")[0].split("-");
        return (
          <PhotoBox
            height={228}
            key={trip._id}
            path={trip.mainImage}
            href={`/travel/${trip._id}`}
          >
            <div className="font-text-large">
              {date[0].slice(2, 4)}년 {date[1]}월
            </div>
            <div
              className="font-subtitle-large"
              style={{ margin: "4px 0 8px" }}
            >
              {trip.name}
            </div>
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
      })}
    </>
  );
};

export default CurrentTravel;
