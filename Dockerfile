FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package.json and install production dependencies
COPY package.json ./
RUN npm install --only=production --omit=dev


COPY prisma ./prisma
RUN npx prisma generate

COPY libs ./libs
COPY .env .env

ARG SERVICE
RUN echo "Building service: $SERVICE"
COPY ./dist/apps/${SERVICE} ./ 

EXPOSE 3000

CMD ["node", "main"]
