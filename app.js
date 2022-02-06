

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const mongodb = require('./db/db.js')
const todosRouter = require('./router/todos.js').router
const tagsRouter = require('./router/tags.js').router
const app = new Koa();

mongodb.connectDB();

app
  .use(bodyParser())
  .use(cors())
  .use(todosRouter.routes())
  .use(todosRouter.allowedMethods())
  .use(tagsRouter.routes())
  .use(tagsRouter.allowedMethods());

app.listen(8080);