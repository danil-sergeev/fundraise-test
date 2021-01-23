# fundraise-test
A test task for FundraiseUp implemented using **DDD Onion Architecture** and **Distroless Containers.**

# Run
For development convinience I've used mongodb in container. Ofc in production it is incorrect.

``` 
docker-compose up --build --force-recreate --detach
```

# Test
If we assume that we have installed mongodb locally, then we could've run tests as an additional step in server/Dockerfile multi-stage build.

```
docker-compose up --build --force-recreate --detach fundraiseup_mongo
npm run test
```
