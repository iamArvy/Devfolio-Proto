FROM node:23-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install --only=production --omit=dev


COPY prisma ./prisma
RUN npx prisma generate

COPY libs ./libs

ARG SERVICE
COPY ./dist/apps/${SERVICE} ./ 

EXPOSE 3000

CMD npx prisma migrate deploy && node main
