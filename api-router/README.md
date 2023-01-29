# ROUTER - embedding api

## How to serve

- build Image 

  ```bash
  $ docker build -t api-router:latest .
  ```

- Serve container

  ```bash
  $ docker run -itd —name api-router -p 8000:80 -e MONGO_PATH=mongodb://localhost:27017/local -e API_EMBEDDING_URL=http://router.hackathon.sparcs.org:8080 -e PORT=80 SESSION_KEY=SESSIONKEY -e AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID> -e AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY> -e AWS_S3_BUCKET_NAME=<AWS_S3_BUCKET_NAME> api-router:latest
  ```
