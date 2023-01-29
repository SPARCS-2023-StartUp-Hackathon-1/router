FROM node:16-alpine

# Copy repository
WORKDIR /usr/src/app
COPY . .

# Install curl (for taxi-docker)
RUN apk update && apk add curl

# Install requirements
RUN npm install --lagacy-peer-deps

# Run container
EXPOSE 80
ENV PORT 80
ENV MONGO_PATH mongodb://localhost:27017/local
ENV API_EMBEDDING_URL http://router.hackathon.sparcs.org:9000
ENV SESSION_KEY SESSION_KEY
CMD ["npm", "run", "serve"]
