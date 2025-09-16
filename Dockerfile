FROM node:22

WORKDIR /usr/local/backend

WORKDIR /usr/local/frontend
COPY /frontend ./
RUN npm install
RUN npm run build

WORKDIR /usr/local/backend
COPY /backend ./
RUN npm install

ENV PORT=3333

EXPOSE 3333
CMD ["npm", "start"]
