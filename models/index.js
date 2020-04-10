let mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-app');


mongoose.Promise = Promise;

module.exports.Todo = require("./todo");