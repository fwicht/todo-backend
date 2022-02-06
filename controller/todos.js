const schemas = require('./schemas.js')
const Todo = schemas.Todo;
const Tag = schemas.Tag;

module.exports = {

    list: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)
        const todos = await Todo.find({}).exec();
        ctx.body = todos;
    },
    clear: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)
        const todos = await Todo.deleteMany({}).exec();
        ctx.status = 204;
    },
    add: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)
        const todo = ctx.request.body;
        if (!todo.title) ctx.throw(400, { 'error': '"title" is a required field' });
        const title = todo.title;
        if (!typeof data === 'string' || !title.length) ctx.throw(400, { 'error': '"title" must be a string with at least one character' });

        todo['completed'] = todo['completed'] || false;
        const td = new Todo(todo);
        td.url = 'http://' + ctx.host + '/todos/' + td._id.toString();
        td.id = td._id.toString();
        await td.save();
        ctx.status = 303;
        ctx.set('Location', td.url);
    },
    show: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)

        const id = ctx.params.id;
        try {
            const todo = await Todo.findById(id).exec();
            ctx.body = todo;

        }
        catch (error) {
            ctx.throw(404, { 'error': error });
        }
    },
    update: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)

        const id = ctx.params.id;

        await Todo.findByIdAndUpdate(id, ctx.request.body).exec();
        const todo = await Todo.findById(id).exec();
        ctx.body = todo;

    },
    remove: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)

        const id = ctx.params.id;

        await Todo.findByIdAndRemove(id).exec();

        ctx.status = 204;

    },

    deleteAll: async (ctx, ids) => {


        for (let index = 0; index < ids.length; index++) {
            await Todo.findByIdAndDelete(ids[index].id).exec();
        }

        ctx.status = 204
    }
};

module.exports.tags = {
    list: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)
        const id = ctx.params.id;
        const todo = await Todo.findById(id).exec();
        ctx.body = todo.tags

    },
    associate: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)

        const id = ctx.params.id;
        const tg = ctx.request.body;
        const tag = await Tag.findById(tg.id).exec()
        const todo = await Todo.findById(id).exec();
        if (!todo.tags.includes(tag)) {

            todo.tags.push(tag)
            tag.todos.push(todo.id)


            await todo.save()
            await tag.save()
        }


        ctx.body = todo;

    },
    delete: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)
        const id = ctx.params.id;
        const todo = await Todo.findById(id).exec();
        todo.tags = []
        todo.save();
        ctx.status = 204;

    },
    remove: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)
        const todoId = ctx.params.id;
        const tagId = ctx.params.tag_id;
        const todo = await Todo.findById(todoId).exec();
        var index = -1;
        for (let i = 0; index < todo.tags.length; i++) {
            if (todo.tags[i].id == tagId) {
                index = i;
                break;
            }

        }

        if (index > -1) {
            todo.tags.splice(index, 1);
        }

        todo.save();
        ctx.status = 204;

    },
}