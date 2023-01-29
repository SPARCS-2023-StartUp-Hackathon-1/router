# ROUTER - main api

## How to serve

- build Image 

  ```bash
  $ docker build -t api-router:latest .
  ```

- Serve container

  ```bash
  $ docker run -itd -p 8000:80 -e AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID> -e AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY> -e AWS_S3_BUCKET_NAME=<AWS_S3_BUCKET_NAME> api-router:latest
  ```
