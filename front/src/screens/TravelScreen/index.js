import React, { useEffect, useState } from "react";
import axios from "utils/axios";
import { useParams } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";
import GrayBox from "components/common/GrayBox";
import "./google_map.css";

const containerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  color: "red",
};

const center = {
  lat: 37.5205,
  lng: 126.8876,
};

const TravelScreen = () => {
  const { tripId } = useParams();
  const [pinList, setPinList] = useState([]);
  const [tripInfo, setTripInfo] = useState(null);
  const [path, setPath] = useState([]);
  useEffect(() => {
    document.getElementById("root").style.height = "calc(100dvh + 1px)";
    const getPinList = async () => {
      const response = await axios.get(`/trip/pinlist/${tripId}`);
      if (response.status === 200) {
        setPinList(response.data);
        const newPath = response.data.map((pin) => ({
          lat: pin.latitude,
          lng: pin.longitude,
        }));
        setPath(newPath);
      }
    };
    const getTripInfo = async () => {
      const response = await axios.get(`/trip/info/${tripId}`);
      if (response.status === 200) {
        setTripInfo(response.data);
      }
    };
    if (tripId) {
      getPinList();
      getTripInfo();
    }
  }, [tripId]);
  const parseDate = (date) => {
    const parsedDate = new Date(date);
    return `${parsedDate.getFullYear()}년 ${parsedDate.getMonth() + 1}월 ${
      parsedDate.getDate() + 1
    }일`;
  };
  const options = {
    strokeColor: "#DE552A",
    strokeOpacity: 1,
    strokeWeight: 3,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 5,
    zIndex: 5,
  };
  return (
    <>
      <GrayBox
        width="calc(100% - 48px)"
        height={84}
        padding="16px 20px"
        radius={16}
        style={{
          position: "fixed",
          top: 92,
          left: "50%",
          zIndex: 10,
          transform: "translate(-50%, 0)",
          backgroundColor: "var(--white)",
        }}
      >
        <div className="font-text-large" style={{ marginBottom: 4 }}>
          {parseDate(tripInfo?.startTime ?? "")} ~{" "}
          {parseDate(tripInfo?.endTime ?? "")}
        </div>
        <div className="font-subtitle-large">{tripInfo?.name ?? ""}</div>
      </GrayBox>
      <LoadScript googleMapsApiKey="AIzaSyB89A46XhoFozfegjbh7gnPzh9FiSQwRbo">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            pinList.length
              ? { lat: pinList[0].latitude, lng: pinList[0].longitude }
              : center
          } // set center
          zoom={10}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {pinList.length &&
            pinList.map((pin) => (
              <InfoWindow
                key={pin._id}
                position={{ lat: pin.latitude, lng: pin.longitude }}
              >
                <div
                  style={{
                    position: "absolute",
                    height: 50,
                    width: 50,
                    borderRadius: "50%",
                    backgroundColor: "var(--gray-c)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "solid 4px var(--white)",
                    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.3)",
                    margin: "-4px",
                    padding: 4,
                    cursor: "pointer",
                  }}
                />
              </InfoWindow>
            ))}
          {path?.length && <Polyline path={path} options={options} />}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default React.memo(TravelScreen);
