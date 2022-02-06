const schemas = require('./schemas.js')
const Todo = schemas.Todo;
const Tag = schemas.Tag;
module.exports = {

    list: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)
        const tags = await Tag.find({}).exec();
        ctx.body = tags;
    },
    clear: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)
        await Tag.deleteMany({}).exec();
        ctx.status = 204;
    },
    add: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)
        const tag = ctx.request.body;
        if (!tag.title) ctx.throw(400, { 'error': '"title" is a required field' });
        const title = tag.title;
        if (!typeof data === 'string' || !title.length) ctx.throw(400, { 'error': '"title" must be a string with at least one character' });
        const tg = new Tag(tag);
        tg.url = 'http://' + ctx.host + '/tags/' + tg._id.toString();
        tg.id = tg._id.toString();
        await tg.save();
        ctx.status = 303;
        ctx.set('Location', tg.url);
    },
    show: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)

        const id = ctx.params.id;
        const tag = await Tag.findById(id).exec();
        if (!tag) ctx.throw(404, { 'error': 'Todo not found' });
        ctx.body = tag;
    },
    update: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)

        const id = ctx.params.id;

        await Tag.findByIdAndUpdate(id, ctx.request.body).exec();
        const tag = await Tag.findById(id).exec();
        ctx.body = tag;

    },
    remove: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)

        const id = ctx.params.id;

        await Tag.findByIdAndRemove(id).exec();

        ctx.status = 204;

    }
};

module.exports.todos = {
    list: async (ctx) => {
        console.log(ctx.request.method + " " + ctx.request.url)
        const id = ctx.params.id;
        const tag = await Tag.findById(id).exec();
        tds = []
        for (let index = 0; index < tag.todos.length; index++) {
            const td = await Todo.findById(tag.todos[index]);
            tds.push(td)

        }
        ctx.body = tds;
    }

};