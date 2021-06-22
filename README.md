# Setup

## Node
- Prerequisites
  - Node > v12
  - Yarn
  - Elastic search
- Setup
  - Change .env file according to your local configuration
  - `yarn install`
  - `yarn start`
  - By default, you can access the site from http://localhost:4001

## Docker
- Prerequisites
  - Docker
  - docker-compose
- Setup
  - Change environment variable in docker-compose file according to your need
  - `docker-compose up -d`
  - By default, you can access the site from http://localhost:4000
  - Docker configuration will expose elastic search on port 9500. If you have a local elasticsearch you don't need to stop it

# Script Interface

## Node
- Update products
  - `yarn update-products`
- Import customers
  - Edit the csv file inside `src/assets/customers.csv`
  - `yarn import-customers`

## Docker
- Update products
  - Get inside the container by `docker exec -it lean-scale-cs /bin/bash`
  - Inside the container run `yarn update-products`
- Import customers
  - Edit the csv file inside `src/assets/customers.csv`
  - Get inside the container by `docker exec -it lean-scale-cs /bin/bash`
  - Inside the container run `yarn import-customers`

# Endpoints

> URLs can change according to your configuration

> You can send the `Accept-Language` header to change the response language

- Get countries
  - http://localhost:4000/api/v1/countries
- Get categories
  - http://localhost:4000/api/v1/categories
- Get products
  - http://localhost:4000/api/v1/products?limit=20&offset=0&q=Bag
  - You can provide custom parameters
- Create customer
  - http://localhost:4000/api/v1/customers
  - Sample payload

```javascript
{
    "email": "lstest10@gmail.com",
    "password": "123456a!",
    "firstname": "lean",
    "lastname": "scale"
}
```