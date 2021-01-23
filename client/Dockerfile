FROM node:lts-alpine as builder

WORKDIR /opt/app
COPY package*.json ./
COPY tsconfig*.json ./

COPY ./src ./src
COPY ./public ./public
COPY ./nginx.conf /nginx.conf

RUN npm install --quiet && npm run build

FROM nginx:1.19.6-alpine

COPY --from=builder /opt/app/dist /usr/share/nginx/html
COPY --from=builder /nginx.conf /etc/nginx/conf.d/default.conf
