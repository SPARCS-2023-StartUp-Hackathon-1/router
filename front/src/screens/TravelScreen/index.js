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
import { s3Url } from "../../loadenv";
import "./google_map.css";

const containerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  color: "red",
};

const TravelScreen = () => {
  const { tripId } = useParams();
  const [pinList, setPinList] = useState([]);
  const [path, setPath] = useState([]);
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });
  const [selectedId, setSelectedId] = useState();
  const [pinInfo, setPinInfo] = useState();

  useEffect(() => {
    if (selectedId) {
      axios.get(`/pin/info/${selectedId}`).then(({ data }) => {
        setPinInfo({
          ...data,
          id: selectedId,
        });
      });
    }
  }, [selectedId]);

  useEffect(() => {
    document.getElementById("root").style.height = "calc(100dvh + 1px)";
    const f = async () => {
      const response = await axios.get(`/trip/pinlist/${tripId}`, {
        params: {
          tripId: tripId,
        },
      });
      if (response.status === 200) {
        setPinList(response.data);
        const newPath = response.data.map((pin) => ({
          lat: pin.latitude,
          lng: pin.longitude,
        }));
        setPath(newPath);
        setCenter({
          lat: response.data[0].latitude,
          lng: response.data[0].longitude,
        });
      }
    };
    if (tripId) f();
  }, [tripId]);

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
          23년 1월 27일 - 현재
        </div>
        <div className="font-subtitle-large">신나는 대전 여행</div>
      </GrayBox>

      <LoadScript googleMapsApiKey="AIzaSyB89A46XhoFozfegjbh7gnPzh9FiSQwRbo">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {pinList.length &&
            pinList.map((pin) => {
              return (
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
                      margin: "-27px",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedId(pin._id)}
                  />
                </InfoWindow>
              );
            })}
          {path?.length && <Polyline path={path} options={options} />}
        </GoogleMap>
      </LoadScript>
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          left: "0px",
          right: "0px",
          height: "280px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "12px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "calc(50% - 33px)",
              width: "67px",
              height: "5px",
              borderRadius: "2.5px",
              background: "white",
              boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            right: "0px",
            top: "12px",
            background: "white",
            borderRadius: "16px 16px 0px 0px",
            boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          {pinInfo?.id === selectedId && (
            <div
              style={{
                padding: "24px",
                paddingBottom: "0px",
                height: "calc(100% - 24px)",
              }}
            >
              <div
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "73px",
                      height: "73px",
                      borderRadius: "12px",
                      background: "#F3F3F3",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={`${s3Url}/image-view/${pinInfo?.pin?.mainImage}`}
                    />
                  </div>
                  <div
                    style={{
                      width: "calc(100% - 89px)",
                    }}
                  >
                    <div
                      className="font-subtitle-large"
                      style={{ lineHeight: "29px" }}
                    >
                      {pinInfo?.pin?.name}
                    </div>
                    <div style={{ height: "8px" }} />
                    <div style={{ lineHeight: "14px", height: "14px" }}>
                      {`${pinInfo?.pin?.startTime} - ${pinInfo?.pin?.endTime}`}
                    </div>
                    <div style={{ height: "8px" }} />
                    <div style={{ lineHeight: "14px", height: "14px" }}>
                      {pinInfo?.pin?.location}
                    </div>
                  </div>
                </div>
                <div style={{ height: "24px" }} />
                <div style={{ display: "flex", gap: "12px" }}>
                  <div
                    style={{
                      width: "calc(50% - 6px)",
                      height: "116px",
                      borderRadius: "12px",
                      background: "#F3F3F3",
                    }}
                  >
                    <div style={{ padding: "12px" }}>
                      <b
                        className="font-text-large"
                        style={{ fontSize: "16px", lineHieght: "19px" }}
                      >
                        사진 모아보기
                      </b>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "calc(50% - 6px)",
                      height: "116px",
                      borderRadius: "12px",
                      background: "#F3F3F3",
                    }}
                  >
                    <div style={{ padding: "12px" }}>
                      <b
                        className="font-text-large"
                        style={{ fontSize: "16px", lineHieght: "19px" }}
                      >
                        핀 노트
                      </b>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(TravelScreen);
