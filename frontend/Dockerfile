# build stage
FROM node:lts-alpine as build-stage

ARG API_BASE_URL
ARG KEYCLOAK_URL
ARG KEYCLOAK_REALM
ARG KEYCLOAK_CLIENT
ARG KEYCLOAK_CLIENT_SECRET
ARG CAMUNDAENGINEBASEURL
ARG CAMUNDABPMNFILE

ENV VUE_APP_API_BASE_URL=$API_BASE_URL
ENV VUE_APP_KEYCLOAK_URL=$KEYCLOAK_URL
ENV VUE_APP_KEYCLOAK_REALM=$KEYCLOAK_REALM
ENV VUE_APP_KEYCLOAK_CLIENT=$KEYCLOAK_CLIENT
ENV VUE_APP_KEYCLOAK_CLIENT_SECRET=$KEYCLOAK_CLIENT_SECRET
ENV VUE_APP_CAMUNDA_BPM_ENGINE_URL=$CAMUNDAENGINEBASEURL
ENV VUE_APP_CAMUNDA_BPM_PROCESSDEF_KEY=$CAMUNDABPMNFILE

COPY frontend/. /src

WORKDIR /src

RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

RUN set -x \
	&& rm -rf /usr/share/nginx/html/* \
	&& chmod go+w /etc/nginx/conf.d/default.conf \
	&& chmod -R 777 /var/log/nginx /var/cache/nginx/ /etc/nginx/nginx.conf /var/run \
	&& chown -R 1001:0 /var/cache/nginx /var/log/nginx /etc/nginx/nginx.conf /var/run


COPY --from=build-stage /src/dist /usr/share/nginx/html
COPY --from=build-stage /src/nginx.conf /etc/nginx/conf.d/default.conf



EXPOSE 6403
CMD ["nginx", "-g", "daemon off;"]