# DevX Base Platform

This platform provides a quick, unified, and standard means of launching an application with almost any stack. It is easily customizable but also provides a starting point for apps of all types.

The platform is built around containers. Everything is a container — each database, each backend, etc. An app can therefore scale horizontally with no effort and can have multiple databases and backends connected together. Simply describe the stack you want in `docker-compose.yml`, generate it with `make stack`, write your code, and launch it with `make deploy`.

## Supported Stacks

Currently, the platform supports a limited number of backends and databases. More will be added soon, but if you don't see the stack you want, it is easy to add.

#### Backends

- Node.js
- Python
- Golang
- Rails
- PHP
- Nginx

#### Databases

- Mongo DB
- MySQL
- PostgreSQL
- Redis

You can select any combination of these stacks.

## Getting Started

Each developer should fork this repo as the start of their base repository. **If you're a new developer and haven't used this platform before, run `make setup`**.

We use docker to create and manage containers. We use docker-compose to orchestrate them and describe how they interact. Edit the `docker-compose.yml` file to include the backend and database technologies you want for your app. Then, run `make stack`. This will generate all the files and configuration needed to deploy the stack. **Make sure to only do this once unless you add something to your stack**. If you remove a technology, you need to manually remove the old files (for safety reasons).

Write your code and develop your application inside the container. **To test your app, run `make dev`.** This will launch your app in a dockerized container. Backends should listen on port 3000. To access your app (both inside and outside the virtual machine), go to `http://localhost:3000`. To restart the app (after making some changes), type `ctrl+c` and then `make dev` again.


To launch your app in production mode, use `make deploy`. 

**If you're cloning the repository and someone has already run `make stack`, do not run it again.**

## Development Practices

Containers let us simulate a production environment during development and isolate errors and problems. Thus, you **should not** install tools such as ruby, rails, go, glide, node, npm, databases, or web servers in vagrant or on the host machine. Instead, they are installed in the container. You should use those tools. To do this, you need to run `bash` inside your container.

### Node.js

For example, if you have set up `web_node` in the `docker-compose.yml` file, you can simply run 

```bash
vagrant@devx:/vagrant$ sudo docker-compose run web_node bash
bash-4.3$
```

to immediately enter your container. Here you can check files and use utilities such as `node` and `npm`. If you want to install express, then you can do so inside the container:

```bash
bash-4.3$ npm install --save express
```
*We recommend installing **all of your dependencies as early as possible**, even those you're not even sure you need, to reduce build time. You can always clean them up at the end.*

After installing new dependencies, **always** run `npm shrinkwrap`. This makes sure that the same versions of the packages will always install.

### Ruby on Rails

Containerizing Rails is just as easy. Assuming you have a `web_rails` in the `docker-compose.yml` file, you can simply run

```bash
vagrant@devx:/vagrant$ dc run web_rails bash
bash-4.3$
```

You can develop as you normally would with rails inside the container:

```bash
bash-4.3$ rake db:create
...
bash-4.3$ rake db:migrate
...
bash-4.3$ echo 'puts "Hello World!"' | ruby
Hello World!
```

### Frontend Development

If you're writing a frontend microservice, or frontend-only application such as React, use the `web_nginx` service in the `docker-compose.yml` file. Modify the `Dockerfile` to include any dependencies you may need (e.g. `nodejs` for React). You can use tools such as `webpack-dev-server` while developing in the container:

```bash
vagrant@devx:/vagrant$ sudo docker-compose run web_nginx bash
bash-4.3$ npm install --save-dev webpack-dev-server
bash-4.3$ webpack-dev-server .
```

When you're done developing, make sure the final built files end up in the `static/` directory.
