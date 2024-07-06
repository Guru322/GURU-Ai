FROM node:21 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --platform=linuxmusl

COPY . .

RUN apt-get update && apt-get install -y ffmpeg imagemagick webp

FROM node:21-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

EXPOSE 5000
CMD [ "npm", "start" ]
