FROM node as base

WORKDIR /var/www/server

RUN apt-get update && apt-get install -y apt-transport-https ca-certificates 
RUN npm i -g pnpm


COPY . .

RUN pnpm install
RUN pnpm run build

FROM node as release

WORKDIR /var/www/server

COPY --from=base /var/www/server/dist ./dist
COPY --from=base /var/www/server/package.json ./package.json
COPY --from=base /var/www/server/pnpm-lock.yaml ./pnpm-lock.yaml

RUN npm i -g pnpm
RUN pnpm prune --prod

ENV MONGODB_URI=$MONGODB_URI

ENV FRONTEND_URL=$FRONTEND_URL
ENV MONGODB_URL=$MONGODB_URL
ENV JWT_ACCESS_SECRET = $JWT_ACCESS_SECRET
ENV SMTP_PROVIDER = $SMTP_PROVIDER
ENV SMTP_EMAIL = $SMTP_EMAIL
ENV SMTP_PASSWORD = $SMTP_PASSWORD

EXPOSE $PORT

CMD ["node", "./dist/index.js"]
