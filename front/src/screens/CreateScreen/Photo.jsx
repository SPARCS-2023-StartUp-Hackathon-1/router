import React from "react";

const Photo = ({ photo, setPhoto }) => {
  const onChange = (e) => {
    // if (e.target.files[0]) {
    //   setPhoto(e.target.files[0]);
    // }
  };

  return (
    <div>
      <div className="font-title-large">
        기억하고 싶은 이번 여행의 사진을 추가해 주세요.
      </div>
      {/* {photo && <img src={URL.createObjectURL(photo)} alt="preview" />} */}
      <div
        className="font-text-large"
        style={{ marginTop: "20px", color: "var(--red)" }}
      >
        <b>사진 추가하기</b> 버튼을 눌러 사진을 추가할 수 있어요.
      </div>
      <input type="file" onChange={onChange} />
    </div>
  );
};

export default Photo;
