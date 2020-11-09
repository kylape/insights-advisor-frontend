# FROM quay.io/app-sre/ubi8-nodejs-12
FROM node:15.1.0 as builder

RUN mkdir /tmp/src
WORKDIR /tmp/src

ADD package.json package-lock.json .
RUN npm install

ADD .git/ .git
ADD static/ static/
ADD locales/ locales
ADD config/ config
ADD src/ src
ADD .eslintrc.yml .eslintignore .stylelintrc.json .babelrc .
RUN npm run build-dev

FROM quay.io/app-sre/nginx:latest
COPY --from=builder /tmp/src/dist /usr/share/nginx/html
