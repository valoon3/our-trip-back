

FROM node:20-alpine

#WORKDIR /app
WORKDIR /our-trip/our-trip-back

RUN npm install -g pm2
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build
#COPY ./.env ./

#COPY ./ ./

CMD ["npm", "run", "start:prod"]
