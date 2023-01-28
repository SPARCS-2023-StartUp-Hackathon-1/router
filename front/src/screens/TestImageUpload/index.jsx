import React, { useRef, useState, useEffect } from "react";
import axios from "utils/axios";
import axiosOri from "axios";

const BtnProfImg = (props) => {
  const inputImage = useRef(null);
  const [profileAlert, setProfileAlert] = useState(null);

  useEffect(() => {
    if (profileAlert === "LOADING") return;
    const timeoutID = setTimeout(() => setProfileAlert(null), 1500);
    return () => clearTimeout(timeoutID);
  }, [profileAlert]);

  const handleUploadProfileImage = async () => {
    setProfileAlert("LOADING");
    try {
      const image = inputImage.current?.files?.[0];
      // const image = await convertImg(inputImage.current?.files?.[0]);
      if (!image) return;
      const { data } = await axios.post("/image/upload/getPUrl", {
        type: image.type,
      });
      if (data.url && data.fields) {
        const formData = new FormData();
        for (const key in data.fields) {
          formData.append(key, data.fields[key]);
        }
        formData.append("file", image);
        const res = await axiosOri.post(data.url, formData);
        if (res.status === 204) {
          const imageId = data.id;
          const res2 = await axios.post("/image/upload/complete", {
            id: imageId,
          });
          if (res2?.data?.result) {
            setProfileAlert("SUCCESS");
            return;
          }
        }
      }
      // FIXME: 실패 경우
      setProfileAlert("FAIL");
    } catch (e) {
      // FIXME: 실패 경우
    }
  };
  const style = {
    textAlign: "center",
    color:
      profileAlert === "SUCCESS"
        ? "green"
        : profileAlert === "FAIL"
        ? "red"
        : profileAlert === "LOADING"
        ? "gray"
        : "purple",
    width: "fit-content",
    margin: "16px auto",
    cursor: profileAlert ? "default" : "pointer",
  };
  const onClick = () => {
    if (!profileAlert) {
      inputImage.current.click();
    }
  };

  return (
    <div style={style} onClick={onClick}>
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg, image/heic"
        hidden
        onChange={handleUploadProfileImage}
        ref={inputImage}
      />
      {profileAlert === "SUCCESS"
        ? "사진이 업로드 완료"
        : profileAlert === "FAIL"
        ? "사진 업로드 실패"
        : profileAlert === "LOADING"
        ? "업로드 중"
        : "프로필 사진 변경"}
    </div>
  );
};

const TestImageUpload = () => {
  return (
    <div style={{ paddingTop: 30 }}>
      <BtnProfImg />
    </div>
  );
};

export default TestImageUpload;
