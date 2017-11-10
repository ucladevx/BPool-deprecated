# BPool

This platform provides a quick and convenient way for UCLA students to find rides and carpool

# Git Protocol

When working on a feature, create a new branch with your name and the feature name. 

```
git checkout -b <your-name>/<feature-name>
git push --set-upstream origin <your-name>/<feature-name>
```

This call will create a new branch and switch to that branch at time of creation

Then when you want to save the state of your code, add and commit your changes:

```
git add -A
git commit -m "some commit message"
git push
```

When you reach a good state and want to merge your work with our master branch, make a pull request! Go to your branch on Github and click the "New pull request" button.

# Dev Environment on Windows
Using docker machine and virtual box
```
docker-machine create --driver=virtualbox default
docker-machine start
eval $(docker-machine env default)
docker-compose up --build
```

# AWS Deployment
To push local repo to the EC2 server
```
make build-aws
make push
```
Then log into the EC2 server machine
```
make ssh
```

And then deploy the pushed changes
```
make deploy
```

