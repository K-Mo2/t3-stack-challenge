# stage 1 building the code
FROM node 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
COPY . .

COPY . /usr/src/app

RUN npm run build

COPY .env .

EXPOSE 3000
CMD npm run dev