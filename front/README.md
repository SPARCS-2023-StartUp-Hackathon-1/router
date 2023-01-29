# ROUTER - router-front

## How to serve

- build Image 

  ```bash
  $ docker build -t router-front:latest .
  ```

- Serve container

  ```bash
  $ docker run -itd —name router-front -p 80:80 -e router-front:latest
  ```
