# Base image
FROM node:20-alpine
#FROM node:20

# Create app directory
WORKDIR /app
#WORKDIR /our-trip/our-trip-back

ENV NODE_ENV=production

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./package.json ./

# Install app dependencies
RUN npm install -g pm2
RUN npm install
RUN npm install @nestjs/cli -g

COPY ./ ./

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD ["npm", "run", "start:prod"]
