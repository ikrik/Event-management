FROM node:22

WORKDIR /usr/src/app

COPY frontend/package.json frontend/package-lock.json ./

RUN npm install

COPY frontend/ ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]