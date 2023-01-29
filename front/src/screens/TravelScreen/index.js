import React, { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
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
import { getS3Url } from "tools/image";
import "./google_map.css";

// const ImageSet = ({ id }) => {
//   useEffect(() => {
//     // axios.get(`/image/info/${selectedId}`).then(({ data }) => {
//     //   setPinInfo({
//     //     ...data,
//     //     id: selectedId,
//     //   });
//     // });
//   }, [id]);

//   return (
//     <div
//       style={{
//         borderRadius: "12px",
//         background: "#F3F3F3",
//         padding: "12px",
//       }}
//     ></div>
//   );
// };

// const ImageSets = ({ imageSets = [] }) => {
//   return (
//     <>
//       {imageSets.map((item, key) => (
//         <ImageSet id={item} key={item} />
//       ))}
//     </>
//   );
// };

const ImageLists = ({ images = [] }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        alignContent: "space-between",
      }}
    >
      {images.map((item, index) => {
        return (
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "#F3F3F3",
              borderRadius: "8px",
              overflow: "hidden",
              flexWrap: "wrap",
            }}
          >
            <img
              style={{ width: "100%", height: "100%" }}
              src={`${s3Url}/image-view/${item}`}
            />
          </div>
        );
      })}
    </div>
  );
};

const useBodySize = () => {
  const bodySizeR = useRef([0, 0]);
  const [bodySize, setBodySize] = useState(bodySizeR.current);

  useEffect(() => {
    const resizeEvent = () => {
      const _bodySize = [document.body.clientWidth, document.body.clientHeight];
      if (
        bodySizeR.current[0] !== _bodySize[0] ||
        bodySizeR.current[1] !== _bodySize[1]
      ) {
        bodySizeR.current = _bodySize;
        setBodySize(_bodySize);
      }
    };
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => window.removeEventListener("resize", resizeEvent);
  }, []);

  return bodySize;
};

const containerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  color: "red",
};

const TravelScreen = () => {
  const bodySize = useBodySize();
  const { tripId } = useParams();
  const [pinList, setPinList] = useState([]);
  const [tripInfo, setTripInfo] = useState(null);
  const [path, setPath] = useState([]);
  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });
  const [bottomClSelected, setBottomClSelected] = useState(false);
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
    const getPinList = async () => {
      const response = await axios.get(`/trip/pinlist/${tripId}`);
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

  const bottomStyle = useSpring({
    position: "absolute",
    bottom: "0px",
    left: "0px",
    right: "0px",
    height: selectedId
      ? bottomClSelected
        ? `${bodySize[1] - 30}px`
        : "280px"
      : "0px",
    zIndex: 100,
  });

  const onChildClick = (childId, info) => {
    setSelectedId(childId);
    setCenter({ lat: info.latitude, lng: info.longitude });
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
          center={center}
          zoom={zoom}
          onChildClick={onChildClick}
          onDragStart={() => setSelectedId(undefined)}
        >
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
                    onClick={() => onChildClick(pin._id, pin)}
                  >
                    <img
                      src={getS3Url(`/image-view/${pin.mainImage}`)}
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                      alt={`/${pin._id}`}
                    />
                  </div>
                </InfoWindow>
              );
            })}
          {path?.length && <Polyline path={path} options={options} />}
        </GoogleMap>
      </LoadScript>
      <animated.div style={bottomStyle}>
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
            onClick={() => {
              if (bottomClSelected) {
                setBottomClSelected(false);
              } else {
                setSelectedId(undefined);
              }
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
                      {`${pinInfo?.pin?.startTime.split("T")[0]} - ${
                        pinInfo?.pin?.endTime.split("T")[0]
                      }`}
                    </div>
                    <div style={{ height: "8px" }} />
                    <div
                      style={{
                        lineHeight: "14px",
                        height: "14px",
                        width: "100%",
                        overflow: "hidden",
                        whiteSpace: "pre",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {pinInfo?.pin?.location}
                    </div>
                  </div>
                </div>
                <div style={{ height: "24px" }} />
                {bottomClSelected ? (
                  <ImageLists images={pinInfo?.imageIds} />
                ) : (
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div
                      style={{
                        width: "calc(50% - 6px)",
                        height: "116px",
                        borderRadius: "12px",
                        background: "#F3F3F3",
                      }}
                      onClick={() => setBottomClSelected(true)}
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
                )}
              </div>
            </div>
          )}
        </div>
      </animated.div>
    </>
  );
};

export default React.memo(TravelScreen);
