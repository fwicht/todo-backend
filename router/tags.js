const tags = require("../controller/tags.js")
const router = require('koa-router')();

router.get('/tags/', tags.list)
    .del('/tags/', tags.clear)
    .post('/tags/', tags.add)
    .get('tags', '/tags/:id', tags.show)
    .patch('/tags/:id', tags.update)
    .del('/tags/:id', tags.remove);


router
    .get('/tags/:id/todos', tags.todos.list);

module.exports.router = router