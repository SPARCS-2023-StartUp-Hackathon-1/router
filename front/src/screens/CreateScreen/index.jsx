import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Button from "components/common/Button";

import Name from "./Name";
import Accompany from "./Accompany";
import Photo from "./Photo";

const CreateScreen = () => {
  const [info, setInfo] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!searchParams.get("step") || !info.name) {
      navigate("/create?step=name", { replace: true });
    }
  }, []);
  useEffect(() => {
    setDisabled(!info.name);
  }, [info.name]);
  const step = searchParams.get("step");
  const getPage = (step) => {
    switch (step) {
      case "name":
        return <Name info={info} setInfo={setInfo} />;
      case "accompany":
        return <Accompany />;
      case "photo":
        return <Photo />;
      default:
        return "";
    }
  };
  const onClickNext = () => {
    if (step === "name") {
      navigate("/create?step=accompany");
    } else if (step === "accompany") {
      navigate("/create?step=photo");
    }
  };

  return (
    <div
      style={{
        paddingTop: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {getPage(step)}
      {!step?.startsWith("photo") ? (
        <Button
          type="red"
          className="font-subtitle-small"
          width={342}
          padding="18px 0"
          radius={30}
          disabled={disabled}
          style={{ margin: "0 auto" }}
          onClick={onClickNext}
        >
          다음
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateScreen;
