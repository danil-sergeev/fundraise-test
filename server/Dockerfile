FROM node:lts-alpine as builder

WORKDIR /opt/app
COPY package*.json ./
COPY tsconfig*.json ./
COPY babel.config.js ./

COPY ./core ./core
COPY ./infrastructure ./infrastructure
COPY ./index.ts ./

RUN npm install --quiet 
RUN npm run build
COPY . .

FROM node:lts-alpine as prod-deps

WORKDIR /opt/app
COPY --from=builder /opt/app/package.json ./

RUN npm install --quiet --only=production \
     npm install pm2 -g

COPY . .

FROM gcr.io/distroless/nodejs:14

COPY --from=builder /opt/app/dist /opt/app/dist
COPY --from=prod-deps /opt/app/node_modules /opt/app/node_modules

WORKDIR /opt/app

ARG SERVICE_PORT

ENV HTTP_PORT ${SERVICE_PORT}
EXPOSE ${HTTP_PORT}

CMD ["./dist/index.js"]
