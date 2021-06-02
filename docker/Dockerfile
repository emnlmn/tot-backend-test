FROM node:16-alpine3.12 as build

RUN apk add --no-cache tini

COPY . /home/project
WORKDIR /home/project

RUN yarn install

RUN NODE_ENV=production yarn run --production build


FROM node:16-alpine3.12 as dist
COPY --from=build /home/project/lib ./home/project
COPY --from=build /home/project/node_modules ./home/project/node_modules
COPY --from=build /sbin/tini /sbin/

USER 1000

WORKDIR /home/project
ENV NODE_ENV=production

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "app.js"]