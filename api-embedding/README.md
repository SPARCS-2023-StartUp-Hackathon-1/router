# ROUTER - embedding api

## How to serve

- download `openjdk-16.0.2_linux-x64_bin.tar.gz`

  ```bash
  $ curl -O https://download.java.net/java/GA/jdk16.0.2/d4a915d82b4c4fbb9bde534da945d746/7/GPL/openjdk-16.0.2_linux-x64_bin.tar.gz
  ```

- download pretrained model

  ```bash
  $ cd download_huggingface_model && python3 downloadAndSave.py
  ```

- build Image 

  ```bash
  $ docker build -t api-embedding:latest .
  ```

- Serve container

  ```bash
  $ docker run -itd --name api-embedding --gpus '"device=0"' -p 8080:8080 api-embedding:latest
  ```
