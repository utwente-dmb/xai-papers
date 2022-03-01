# DMB Literature Website
## How to setup
#### Setup .env
Create a file ```mongo.env``` with keys ```MONGO_INITDB_ROOT_USERNAME``` and ```MONGO_INITDB_ROOT_PASSWORD```.

#### Create venv
Go to backend folder, ```cd backend```\
Create new venv, ```python -m venv venv```\
Activate venv, ```.\venv\Scripts\activate```\
Install requirements, ```pip install -r requirements.txt```

## How to run
For debugging: ```docker-compose up --build```\
For production: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build```