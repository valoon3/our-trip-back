FROM node:20-alpine
#FROM node:20

WORKDIR /app
#WORKDIR /our-trip/our-trip-back

ENV NODE_ENV=production

COPY ./package.json ./
#
RUN npm install -g pm2
RUN npm install
RUN npm install @nestjs/cli -g

COPY ./ ./

RUN npm run build

CMD ["npm", "run", "start:prod"]
