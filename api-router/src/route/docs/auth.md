### `/login` **(POST)**

- 요청받은 정보로 로그인 시도

#### POST request form

```javascript
{
  id: String, // 로그인을 할 사용자의 id
  nickname: String // 로그인 할 사용자의 nickname
}
```

### `/logout` **(GET)**

- 세션을 삭제하여 사용자를 로그아웃시킴

#### URL Parameters

- 없음

#### Response

```javascript
{
    status: 200,
    data: "logged out successfully",
}
```

### `/logininfo` **(GET)**

- 사용자의 로그인 세션이 유효한 경우 사용자의 정보를 반환하는 API.

#### URL Parameters

- 없음

#### Response

- 현재 로그인된 사용자의 정보

```javascript
{
  id: String,
  nickname: String,
}
```

- 로그인되어있지 않은 경우 아래 정보를 반환함.

```javascript
{
  id: undefined,
  name: undefined,
}
```
