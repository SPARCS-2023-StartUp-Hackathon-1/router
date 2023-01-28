import React, { useEffect, useState } from "react";
import axios from "utils/axios";
import PhotoBox from "components/common/PhotoBox";
import loginInfoAtom from "recoil/logininfo/atom";
import { useRecoilValue } from "recoil";

const PastScreen = () => {
  const [trips, setTrips] = useState([]);
  const loginInfo = useRecoilValue(loginInfoAtom);
  useEffect(() => {
    const f = async () => {
      const response = await axios.get(`/user/triplist/${loginInfo.id}`);
      console.log(response);
      if (response.status === 200) setTrips(response.data);
    };
    if (loginInfo?.id) f();
  }, [loginInfo]);
  console.log(trips);
  return (
    <div style={{ position: "relative", marginTop: 110 - 32 }}>
      <div
        style={{
          position: "fixed",
          paddingTop: 32,
          width: "calc(100% - 48px)",
          background: "rgba(255, 255, 255, 0.75)",
          WebkitBackdropFilter: "blur(20px)",
          BackdropFilter: "blur(20px)",
        }}
      >
        <div className="font-title-large">지난 여행</div>
        <div style={{ margin: "8px 0 24px", color: "var(--red)" }}>
          총 <b style={{ textDecoration: "underline" }}>8</b>
          건의 여행이 있어요
        </div>
        <input className="font-text-large" placeholder="여행 검색하기" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 153 + 32,
          rowGap: 12,
        }}
      >
        {trips.length &&
          trips.map((trip) => (
            <PhotoBox
              key={trip._id}
              path={trip.mainImage}
              href={`/travel/${trip._id}`}
            />
          ))}
      </div>
    </div>
  );
};

export default PastScreen;
