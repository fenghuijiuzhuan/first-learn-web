# syntax=docker/dockerfile:1

FROM node:18.12.1
COPY . ./workspace
WORKDIR /workspace
RUN npm install
CMD npm run dev
EXPOSE 3000
