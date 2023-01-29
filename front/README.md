# ROUTER - router-front

## How to serve

- build Image 

  ```bash
  $ docker build -t router-front:latest .
  ```

- Serve container

  ```bash
  $ docker run -itd —name router-front -e REACT_APP_API_ROUTER_URL=http://router.hackathon.sparcs.org:8000 -e REACT_APP_S3_URL=https://sparcs-2023-startup-hackathon-b-1.s3.ap-northeast-2.amazonaws.com -p 80:80 -e router-front:latest
  ```
