FROM pytorch/pytorch:1.13.1-cuda11.6-cudnn8-runtime

# Copy repo
WORKDIR /home
COPY . .

# Install java
RUN tar -zxvf openjdk-16.0.2_linux-x64_bin.tar.gz && \
    mv jdk-16.0.2 /usr/lib/jdk-16.0.2
ENV JAVA_HOME "/usr/lib/jdk-16.0.2"

# Install python dependencies
RUN pip install -r requirements.txt && \
    pip install -r requirements.mar.txt

# Create Model archive
RUN mkdir models && \
    torch-model-archiver \
    --model-name vit \
    # --serialized-file <Path to .pt or .pth file containing state_dict> \
    # --model-file <Path to python file containing model architecture> \
    --version 1.0 \
    --handler vit_handler.py \
    --extra-files download_huggingface_model/model,download_huggingface_model/processor \
    --requirements-file requirements.mar.txt \
    --export-path models

# Run container
EXPOSE 8080
CMD ["sh", "-c", "torchserve --ts-config config.properties --start && cd api && python -m uvicorn main:app --port 8080 --host 0.0.0.0"]
