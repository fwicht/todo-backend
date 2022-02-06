const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId
const todoSchema = new Schema(
    {
        id: String,
        title: String,
        order: Number,
        completed: Boolean,
        url: String,
        tags: [Object]
    }
)
const Todo = mongoose.model("Todo", todoSchema)
const tagSchema = new Schema({
    id: String,
    title: String,
    url: String,
    todos: [ObjectId]
})

const Tag = mongoose.model("Tag", tagSchema)

module.exports.Tag = Tag
module.exports.Todo = Todo