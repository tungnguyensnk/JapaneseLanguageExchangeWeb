FROM node:slim
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
VOLUME /app/node_modules
COPY . .
CMD [ "npm", "start" ]