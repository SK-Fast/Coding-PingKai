# syntax=docker/dockerfile:1
FROM ubuntu:latest
WORKDIR /Coding-Pingkai
COPY . .
RUN apt update
RUN apt install default-jdk -y
RUN apt install nodejs -y
RUN apt install npm -y
RUN npm i
CMD ["npm", "run", "both"]
EXPOSE 5174 9099 8080 9199