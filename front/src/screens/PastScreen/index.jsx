import React, { useEffect, useState } from "react";
import axios from "utils/axios";
import PhotoBox from "components/common/PhotoBox";
import loginInfoAtom from "recoil/logininfo/atom";
import { useRecoilValue } from "recoil";

const PastScreen = () => {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  const loginInfo = useRecoilValue(loginInfoAtom);
  useEffect(() => {
    const f = async () => {
      const response = await axios.get(`/user/triplist/${loginInfo.id}`);
      if (response.status === 200) setTrips(response.data);
    };
    if (loginInfo?.id) f();
  }, [loginInfo]);
  const searchedTrips = trips.filter((trip) => {
    return (
      trip.startTime.includes(search) ||
      trip.startTime.includes(search) ||
      trip.name.includes(search)
    );
  });
  console.log(searchedTrips);
  return (
    <div style={{ position: "relative", marginTop: 110 - 32 }}>
      <div
        style={{
          position: "fixed",
          paddingTop: 32,
          width: "calc(100% - 48px)",
          background: "rgba(255, 255, 255, 0.75)",
          webkitBackdropFilter: "blur(20px)",
          BackdropFilter: "blur(20px)",
        }}
      >
        <div className="font-title-large">지난 여행</div>
        <div style={{ margin: "8px 0 24px", color: "var(--red)" }}>
          총 <b style={{ textDecoration: "underline" }}>8</b>
          건의 여행이 있어요
        </div>
        <input
          className="font-text-large"
          placeholder="여행 검색하기"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 153 + 32,
          rowGap: 12,
        }}
      >
        {!trips.length ? (
          <div style={{ textAlign: "center" }}>여행 기록이 없어요</div>
        ) : !searchedTrips.length ? (
          <div style={{ textAlign: "center" }}>해당하는 여행이 없어요</div>
        ) : (
          searchedTrips.map((trip) => {
            const date = trip.startTime.split("T")[0].split("-");
            return (
              <PhotoBox
                key={trip._id}
                path={trip.mainImage}
                href={`/travel/${trip._id}`}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <div style={{ marginBottom: 4 }}>
                    {date[0].slice(2, 4)}년 {date[1]}월
                  </div>
                  <div className="font-subtitle-small">{trip.name}</div>
                </div>
              </PhotoBox>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PastScreen;
