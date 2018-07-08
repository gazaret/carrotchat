## Carrot Chat
#### Simple chat on Django and AngularJS

### Requirements 
* PostgreSQL
* Redis
* Python 3
* NodeJS

### Installation
##### Backend:
* ```virtualenv ./server/env```
* ```pip install -r server/requirements.txt```
* Create db (db config in ./server/settings.py)
* ```python3 ./server/manage.py migrate```
* ```python3 ./server/manage.py runserver```

##### Frontend
* ```npm install```
* ```npm run dev``` for develop
* ```npm run build``` for build