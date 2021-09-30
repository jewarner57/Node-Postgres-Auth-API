FROM node:12.17.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install nodemon -g && npm install
COPY ./database.sql /docker-entrypoint-initdb.d/
COPY . /usr/src/app/

EXPOSE 3001

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm run dev