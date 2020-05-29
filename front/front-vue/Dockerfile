FROM node:lts-alpine as build-stage

RUN npm install -g http-server

RUN ls -al

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production-stage

RUN ls -al

COPY default.conf /etc/nginx/conf.d

COPY --from=build-stage /app/dist /usr/share/nginx/html

CMD ["nginx","-g","daemon off;"]

