# start with a lightweight linux image
FROM node:alpine

ADD package.json /tmp
ADD npm-shrinkwrap.json /tmp
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app

# set the working directory
WORKDIR /app
ADD . /app

# open a port and start the server
EXPOSE 3000
CMD ["npm", "start"]