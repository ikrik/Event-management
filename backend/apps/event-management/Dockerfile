FROM node:22

WORKDIR /usr/src/app

COPY ./backend ./

# Install dependencies
RUN npm install

COPY ./backend/apps/event-management ./

EXPOSE 3002

CMD ["npm", "run", "start:event-dev"]