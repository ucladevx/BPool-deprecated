# start with a lightweight linux image
FROM alpine:3.6

# add redis user first for consistency
RUN adduser -SDH redis

# add necessary packages
RUN apk update && \
    apk upgrade && \ 
    apk add bash curl redis && \
    rm -rf /var/cache/apk/*

# persist db data
RUN mkdir -p /data/db
VOLUME /data/db
WORKDIR /data/db

# copy configuration
RUN mkdir /etc/redis
COPY redis.conf /etc/redis

# configure database container for security
RUN chown -R redis:redis /data/db
RUN chmod 770 /data/db

# open ports
EXPOSE 6379

# run the redis server
CMD ["redis-server"]