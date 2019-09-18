# Match Cut

There are 3 parts, each a separate node app

#### api
  - a REST API build with REST-hapi
  - it also serves the client code and admin code in production
  - you only need to deploy this
  - a mongo db is required
  - runs on localhost:9000 in dev
#### client
  - React App made with create-react-app
  - uses proxy in package.json for API requests
#### api
  - React App using react-admin
  - uses proxy in package.json for API requests

## Develop

#### mongodb
````
docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:3.4
````
#### api
````
cd api
npm install
npm start
````
go to http://localhost:9000/api#/api to see the endpoints

#### client
````
cd api
npm install
npm start
````
go to http://localhost:3001 to develop

#### admin
````
cd admin
npm install
npm start
````

## Deploy

Build Admin and copy to API to serve
````
cd admin
bin/build_and_copy
````

Build Client and copy to API to serve
````
cd client
bin/build_and_copy
````
