# [TEAM B] Repository router

이 Repository는 **SPARCS 2023 StartUp Hackathon** 제출용으로, "Router" 프로젝트의 웹 프론트, 백엔드를 담당하는 Monorepo입니다. 이 레포에는 다음과 같은 기능이 포함되어 있습니다.

- 여행 사진 업로드
- 시간 및 장소 기반 사진 클러스터링
- 연속된 사진 유사도 검사 후 클러스터링
- 지도 뷰로 여행 일정 관리 (예정)
- 친구와 공유 (예정)

## 프로젝트에서 사용한 기술

- front
  - react
- back
  - node.js
  - mongodb
- aws
  - s3
- etc
  - clustering algorithm
  - 유사도 pretrained ML model
  - google maps api

## Dev Server 실행 방법

- front
  - npm install 실행
  - .env 설정
  - npm start
- back
  - npm install 실행
  - .env 설정
  - node app.js

## Production 배포 방법

- [프론트엔드](https://github.com/SPARCS-2023-StartUp-Hackathon-1/router/blob/main/front/README.md)
- [백엔드](https://github.com/SPARCS-2023-StartUp-Hackathon-1/router/blob/main/api-router/README.md)
- [임베딩](https://github.com/SPARCS-2023-StartUp-Hackathon-1/router/blob/main/api-embedding/README.md)

## 환경 변수 및 시크릿

... 서비스를 실행하기 위한 환경 변수 및 시크릿 ...
(입력되어야 하는 값에 대한 제한이 있는 경우 포함해 주시기 바랍니다)
실제 시크릿 (credential) 값은 절대로 git에 업로드 하면 안됩니다.
어떤 값이 필요한지 (변수명)만 작성해 주세요.

- front

```
REACT_APP_S3_URL=https://sparcs-2023-startup-hackathon-b-1.s3.ap-northeast-2.amazonaws.com
REACT_APP_API_ROUTER_URL=http://localhost:9000
```

- back

```
PORT=9000
MONGO_PATH=mongodb://localhost:27017/local-router
API_EMBEDDING_URL=http://router.hackathon.sparcs.org:8080
SESSION_KEY=2023 SPARCS router
AWS_ACCESS_KEY_ID="AWS KEY ID"
AWS_SECRET_ACCESS_KEY="AWS SECRET KEY"
AWS_S3_BUCKET_NAME=sparcs-2023-startup-hackathon-b-1
```

## 기타

- 사진 clustering을 위해 사진의 시간,위도,경도 정보를 처리해 clustering 하였습니다.
- 또한 유사한 사진들을 묶기 위해 사진간 유사도를 검사하는 Pretrained ML model을 사용했습니다.
- google maps api를 이용해 cluster들을 지도위에 표시하였습니다.
- 해당 cluster의 이름 및 위치는 google map api를 이용해 자동으로 생성헤줍니다.
