import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/common/Button";
import axios from "utils/axios";
import axiosOri from "axios";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const UB = ({ children }) => (
  <u>
    <b>{children}</b>
  </u>
);

const Photo = ({ info, setInfo }) => {
  const inputImage = useRef(null);
  const [profileAlert, setProfileAlert] = useState(null);
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    setMessage(
      <>
        선택한 <UB>{info.total}</UB>장의 사진 중 <br />
        <UB>{info.photos?.length}</UB>장의 사진이 성공적으로 추가 되었어요.
      </>
    );
  }, [info.photos?.length, info.total]);
  // useEffect(() => {
  //   if (profileAlert === "LOADING") return;
  //   const timeoutID = setTimeout(() => setProfileAlert(null), 1500);
  //   return () => clearTimeout(timeoutID);
  // }, [profileAlert]);

  const handleUploadProfileImage = async () => {
    setProfileAlert("LOADING");
    const images = inputImage.current?.files;
    const imageUploadSuccessList = [];
    const imageUploadFailList = [];
    for (const image of images) {
      try {
        if (!image) return;
        const { data } = await axios.post("/image/upload/getPUrl", {
          type: image.type,
        });
        try {
          if (!data.url || !data.fields) throw new Error("Upload image fail");
          const formData = new FormData();
          for (const key in data.fields) {
            formData.append(key, data.fields[key]);
          }
          formData.append("file", image);
          const res = await axiosOri.post(data.url, formData);
          if (res.status !== 204) throw new Error("Upload image fail");
          const imageId = data.id;
          const res2 = await axios.post("/image/upload/complete", {
            id: imageId,
          });
          if (!res2?.data?.result) throw new Error("Upload image fail");
          // 사진 하나 업로드 성공
          imageUploadSuccessList.push(data.id);
        } catch (e) {
          // 사진 하나 업로드 실패
          imageUploadFailList.push(data.id);
        }
      } catch (e) {
        console.error(e);
      }
    }
    setInfo({
      ...info,
      total: images.length + (info.total ?? 0),
      photos: (info.photos ?? []).concat(imageUploadSuccessList),
    });
    if (!imageUploadSuccessList.length) setProfileAlert("FAIL");
    else {
      setDisabled(!info.photos?.length);
      setProfileAlert("SUCCESS");
    }
    console.log(imageUploadSuccessList, imageUploadFailList);
  };
  const style = {
    backgroundColor:
      profileAlert === "SUCCESS"
        ? "var(--red)"
        : profileAlert === "FAIL"
        ? "var(--red)"
        : profileAlert === "LOADING"
        ? "var(--light-red)"
        : "var(--red)",
    cursor: profileAlert === "LOADING" ? "default" : "pointer",
    height: 60,
  };
  const checkStyle = {
    backgroundColor:
      profileAlert === "LOADING"
        ? "var(--gray-c)"
        : info.photos?.length
        ? "var(--red)"
        : "var(--gray-c)",
    cursor:
      profileAlert === "LOADING" || !info.photos?.length
        ? "default"
        : "pointer",
    height: 60,
  };
  const onClick = () => {
    if (profileAlert !== "LOADING") {
      inputImage.current.click();
    }
  };
  return (
    <>
      <div className="font-title-large">
        기억하고 싶은 <br />
        이번 여행의 사진을
        <br /> 추가해 주세요.
      </div>
      <div
        className="font-text-large"
        style={{ margin: "20px 0 auto", color: "var(--red)" }}
      >
        {profileAlert === "FAIL" ? (
          <>
            사진 업로드에 <b>실패</b>했어요. <br />
            {info.photos?.length ? (
              <>
                <br />
                {message}
              </>
            ) : (
              "다시 시도해주세요."
            )}
          </>
        ) : profileAlert === "SUCCESS" ? (
          message
        ) : profileAlert === "LOADING" ? (
          "사진을 업로드 중입니다."
        ) : (
          <>
            <b>사진 추가하기</b> 버튼을 눌러 사진을 추가할 수 있어요.
          </>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          columnGap: 12,
        }}
      >
        <Button
          type="red"
          className="font-subtitle-small"
          width="100%"
          padding="18px 0"
          radius={30}
          style={style}
          disabled={profileAlert === "LOADING"}
          onClick={onClick}
        >
          <input
            type="file"
            accept="image/jpg, image/png, image/jpeg, image/heic"
            hidden
            onChange={handleUploadProfileImage}
            ref={inputImage}
            multiple
          />
          {profileAlert === "SUCCESS"
            ? "사진 더 추가하기"
            : profileAlert === "FAIL"
            ? "다시 사진 추가하기"
            : profileAlert === "LOADING"
            ? "업로드 중"
            : "사진 추가하기"}
        </Button>
        <Button
          type="red"
          width={60}
          padding={18}
          radius={30}
          style={checkStyle}
          disabled={disabled}
          // onClick={()=>navigate()}
        >
          <CheckRoundedIcon fontSize="medium" />
        </Button>
      </div>
    </>
  );
};

export default Photo;
