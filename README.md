# DMB Literature Website
## How to setup
Create a file ```mongo.env``` with keys ```MONGO_INITDB_ROOT_USERNAME``` and ```MONGO_INITDB_ROOT_PASSWORD```.

## How to run
For debugging: ```docker-compose up --build```
For production: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build```