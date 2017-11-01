# start with a lightweight linux image
FROM alpine:3.6

# add necessary packages
RUN apk update && \
    apk upgrade && \
    apk add bash 'nodejs-npm<=6.11' && \
    rm -rf /var/cache/apk/*

# create the data volume
VOLUME ["/app"]

# copy the package.json and shinkwrap file to app location
COPY package.json /tmp
COPY npm-shrinkwrap.json /tmp
RUN cd /tmp && \
    mkdir node_modules && \
    npm install && \
    mv /tmp/node_modules /app/node_modules

# set the working directory
WORKDIR /app

# open a port and start the server
EXPOSE 3000
CMD ["npm", "start"]