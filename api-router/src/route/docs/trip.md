### `/create` **(POST)**

요청을 받아 trip을 생성

`Request body`

```javascript
{
  name : String, // 여행의 이름
  startTime : String, // 출발지 시간 string으로 2022-01-01
  endTime : String, // 도착지 시간 string 으로
  progress : Boolean, // 진행중인 여행 : true, 아니면 false
  pins : image[],  // front에서는 사용자 선택한 사진들을 pins list에 보내서 요청
}
```

### `/pinlist` **(GET)**

해당 여행의 pinlist 전체를 반환 (여행에서 각각의 사진묶음들을 의미)
