FROM node:16-alpine

# Copy repository
WORKDIR /usr/src/app
COPY . .

# Install curl (for taxi-docker)
RUN apk update && apk add curl

# Install requirements
RUN npm install && \
    npm install react-inject-env@2.1.0 --save && \
    npm install serve@14.1.2 -g

# build
RUN npm run build

# serve
EXPOSE 80
ENV REACT_APP_API_ROUTER_URL http://router.hackathon.sparcs.org:8000
ENV REACT_APP_S3_URL https://sparcs-2023-startup-hackathon-b-1.s3.ap-northeast-2.amazonaws.com
CMD ["sh", "-c", "npx react-inject-env set && serve -s build -l 80"]
