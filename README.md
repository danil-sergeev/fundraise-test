# fundraise-test
A test task for FundraiseUp implemented using **DDD Onion Architecture** and **Distroless Containers.**

# Run
For development convinience I've used mongodb in container. Ofc in production it is incorrect.

``` 
docker-compose up --build --force-recreate --detach
docker ps
```

## Then navigate to http://localhost:80

# Test
If we assume that we have installed mongodb locally, then we could've run tests as an additional step in server/Dockerfile multi-stage build.
But for comfort I have used it as docker container.

## ❗️ TO RUN TESTS YOU HAVE TO INSTALL DEPENDENCIES LOCALLY ❗ ️
```
docker-compose up --build --force-recreate --detach fundraiseup_mongo
cd server
npm run test
```
