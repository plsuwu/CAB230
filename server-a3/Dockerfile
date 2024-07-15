FROM node:current AS base
WORKDIR /server

RUN apt-get update -y && apt-get install ncat -y

COPY . .
COPY .env .
RUN npm install
RUN npm run build
RUN chmod +x /server/start.sh

EXPOSE 8080/tcp
ENTRYPOINT [ "./start.sh" ]



