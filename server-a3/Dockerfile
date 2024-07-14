FROM node:current AS base
WORKDIR /app/server

RUN apt-get update -y && apt-get install ncat -y

# INSTALL DEPENDENCIES FROM LOCKFILE
FROM base AS install
RUN mkdir -p /tmp/server/install
COPY package.json package-lock.json /tmp/server/install/
RUN cd /tmp/server/install && npm ci


# BUILD CONTAINER CONTAINER IMAGE FROM SOURCE
FROM base AS build
COPY --from=install /tmp/server/install/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN npm run build

# COPY MODULES AND SOURCE TO FINAL IMAGE
FROM base AS release
COPY --from=install /tmp/server/install/node_modules node_modules
COPY --from=build /app/server .
COPY start.sh .
RUN chmod +x /app/server/start.sh

EXPOSE 8000/tcp
ENTRYPOINT [ "./start.sh" ]



