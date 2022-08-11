FROM node:alpine as build

WORKDIR /app

COPY ./public /app/public
COPY ./src /app/src
COPY ./package.json /app
COPY ./postcss.config.js /app
COPY ./tailwind.config.js /app
COPY ./tsconfig.json /app
COPY ./.env /app

RUN npm install
RUN npm run build

FROM node
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build /app/build

EXPOSE 3000
ENTRYPOINT [ "serve", "-s", "build",  "-l", "3000", "--debug"]