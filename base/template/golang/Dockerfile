# start with a lightweight linux image
FROM alpine:3.6

# add necessary packages
RUN apk update && \
    apk upgrade && \
    apk add bash curl git go glide libc-dev && \
    rm -rf /var/cache/apk/*

# setup go env variables
ENV GOPATH /go
ENV PATH $GOPATH:$PATH

# create directory structure and copy the glide files
VOLUME ["/go"]
COPY src/app/glide.* /tmp/
RUN cd /tmp && \
    mkdir vendor && \
    mkdir -p /go/src && \
    glide install && \
    mv vendor /go/src/app/

# copy remaining source files
COPY src/app /go/src/app

# build the app
WORKDIR /go
RUN mkdir /app && cd /app && go build -o /app/bin/app app

# open a port and start the server
EXPOSE 3000
CMD ["/app/bin/app"]
