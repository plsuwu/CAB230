FROM node:current AS base
WORKDIR /app/client

FROM base AS install
COPY . .
RUN npm i && npm i serve
RUN npm run build

FROM install AS main
COPY --from=install /app/client/dist/ .

EXPOSE 3000/tcp
ENTRYPOINT [ "npx", "serve" ]

