const todos = require("../controller/todos.js")
const router = require('koa-router')();
router.get('/todos/', todos.list)
    .del('/todos/', todos.clear)
    .post('/todos/', todos.add)
    .get('todo', '/todos/:id', todos.show)
    .patch('/todos/:id', todos.update)
    .del('/todos/:id', todos.remove);


router
    .get('/todos/:id/tags', todos.tags.list)
    .post('/todos/:id/tags', todos.tags.associate)
    .del('/todos/:id/tags', todos.tags.delete)
    .del('/todos/:id/tags/:tag_id', todos.tags.remove);
module.exports.router = router