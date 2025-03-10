FROM node:22

WORKDIR /usr/src/app

COPY ./backend ./

# Install dependencies
RUN npm install

# Copy to include shared package.json and dependencies
COPY ./backend/apps/api-gateway ./

EXPOSE 3001

CMD ["npm", "run", "start:api"]