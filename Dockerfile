FROM node:16-alpine as build

WORKDIR /usr/share/duff

ADD . .

RUN TZ=America/Sao_Paulo
RUN echo "#Etc/UTC" > /etc/timezone
RUN echo $TZ >> /etc/timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN cat /etc/timezone
RUN date

RUN apk add --no-cache make g++ python3 yarn \    
    && yarn \    
    && yarn build \
    && yarn typeorm:run \
    && cd dist \
    && yarn install --production

FROM node:16-alpine

WORKDIR /app

COPY --from=build /usr/share/duff/dist dist
COPY --from=build /usr/share/duff/node_modules node_modules
COPY --from=build /usr/share/duff/package.json package.json

RUN TZ=America/Sao_Paulo
RUN echo "#Etc/UTC" > /etc/timezone
RUN echo $TZ >> /etc/timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN cat /etc/timezone
RUN date


EXPOSE 8080

CMD ["node", "dist/main.js"]
