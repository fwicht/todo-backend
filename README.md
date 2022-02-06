# todo-backend-node-koa

## Usage
- Fill in the env file
```
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_PORT=
MONGO_DB=
MONGO_HOSTNAME=
```
- Bring up the database
```
docker-compose -f docker/docker-compose.yml up -d
```
- Start the app
```
node app.js
```

## Tests

You can run validate the application with http://www.todobackend.com/specs/.