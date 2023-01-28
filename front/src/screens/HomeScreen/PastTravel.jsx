import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "utils/axios";
import PhotoBox from "components/common/PhotoBox";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import loginInfoAtom from "recoil/logininfo/atom";
import { useRecoilValue } from "recoil";
import GrayBox from "components/common/GrayBox";

const PastTravel = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();
  const loginInfo = useRecoilValue(loginInfoAtom);
  useEffect(() => {
    const f = async () => {
      const response = await axios.get(`/user/triplist/${loginInfo.id}`);
      console.log(response);
      if (response.status === 200) setTrips(response.data);
    };
    if (loginInfo?.id) f();
  }, [loginInfo]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="font-text-large">지난 여행 돌아보기</div>
        <KeyboardArrowRightRoundedIcon
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/past")}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "12px",
          rowGap: 12,
        }}
      >
        {trips.length ? (
          trips
            .slice(0, 3)
            .map((trip) => (
              <PhotoBox
                key={trip._id}
                path={trip.mainImage}
                href={`/travel/${trip._id}`}
              />
            ))
        ) : (
          <GrayBox padding="24px 0">
            <div style={{ textAlign: "center" }}>여행 기록이 없어요</div>
          </GrayBox>
        )}
      </div>
    </>
  );
};

export default PastTravel;
