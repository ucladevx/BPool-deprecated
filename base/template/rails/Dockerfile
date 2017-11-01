# start with a lightweight linux image
FROM alpine:3.6

# define env variables
ENV BUILD_PACKAGES bash nodejs build-base ruby-dev sqlite-dev openssl-dev libffi-dev curl-dev libc-dev linux-headers
ENV RUBY_PACKAGES ruby ruby-io-console ruby-bundler ruby-irb ruby-json ruby-rake ruby-bigdecimal
ENV BUNDLE_PATH /gems

# add necessary packages
RUN apk update && \
    apk upgrade && \
    apk add $BUILD_PACKAGES $RUBY_PACKAGES && \
    rm -rf /var/cache/apk/*

# create working directory
VOLUME ["/app"]
RUN gem install bundler --no-document
# copy the package.json and shinkwrap file to app location
# COPY Gemfile* /tmp/
# RUN apk --update add --virtual build-dependencies build-base ruby-dev sqlite-dev openssl-dev \
#     libffi-dev curl-dev libc-dev linux-headers && \
#     gem install bundler --no-document && \
#     cd /tmp && bundle install && \
#     apk del build-dependencies

# set the working directory and copy source files
# COPY . /app/
# RUN chown -R nobody:nogroup /app  
# USER nobody
WORKDIR /app

# open a port and start the server
EXPOSE 3000
CMD ["rails", "s", "-b", "0.0.0.0"]