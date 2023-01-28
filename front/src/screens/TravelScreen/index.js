import React, { useEffect } from "react";
import { GoogleMap, LoadScript, InfoWindow } from "@react-google-maps/api";
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

const positions = [
  {
    lat: 37.5205,
    lng: 126.8876,
  },
  {
    lat: 37.5205,
    lng: 126.8976,
  },
  {
    lat: 37.5155,
    lng: 126.8926,
  },
];
const options = {
  border: "1px solid #000000",
  strokeColor: "#ffffff",
  strokeOpacity: 1,
  strokeWeight: 5,
  fillColor: "#cccccc",
  fillOpacity: 1,
  // clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 200,
  zIndex: 77,
};

const TravelScreen = () => {
  useEffect(() => {
    document.getElementById("root").style.height = "calc(100dvh + 1px)";
  }, []);
  return (
    <>
      <GrayBox
        width="calc(100% - 48px)"
        height={84}
        padding="16px 20px"
        radius={16}
        style={{
          position: "fixed",
          top: 44,
          left: "50%",
          zIndex: 10,
          transform: "translate(-50%, 0)",
          backgroundColor: "var(--white)",
        }}
      >
        <div className="font-text-large" style={{ marginBottom: 4 }}>
          23년 1월 27일 - 현재
        </div>
        <div className="font-subtitle-large">신나는 대전 여행</div>
      </GrayBox>
      <LoadScript googleMapsApiKey="AIzaSyB89A46XhoFozfegjbh7gnPzh9FiSQwRbo">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center} // set senter
          zoom={15}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {/* <Marker
          icon={
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
          }
          position={positions[0]}
        /> */}
          {/* <Circle center={center} options={options} /> */}
          <InfoWindow position={positions[2]}>
            <div
              style={{
                position: "absolute",
                height: 60,
                width: 60,
                borderRadius: "50%",
                backgroundColor: "var(--gray-c)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "solid 4px var(--white)",
                boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.3)",
                margin: "12px",
                cursor: "pointer",
              }}
            />
          </InfoWindow>
          <InfoWindow position={positions[1]}>
            <div
              style={{
                height: 60,
                width: 60,
                borderRadius: "50%",
                backgroundColor: "var(--gray-c)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "solid 4px var(--white)",
                boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.3)",
                margin: "12px",
                cursor: "pointer",
              }}
            />
          </InfoWindow>
          <InfoWindow position={positions[0]}>
            <div
              style={{
                height: 60,
                width: 60,
                borderRadius: "50%",
                backgroundColor: "var(--gray-c)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "solid 4px var(--white)",
                boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.3)",
                margin: "12px",
                cursor: "pointer",
              }}
            />
          </InfoWindow>
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default React.memo(TravelScreen);
