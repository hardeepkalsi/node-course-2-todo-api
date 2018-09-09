const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => { //Empty query object to delete everything
//     console.log(result);
// });

Todo.findOneAndRemove({_id: "5b938a63f79dc0151eae8fc9"}).then( (todo) => {
});

// Todo.findByIdAndRemove("5b938a63f79dc0151eae8fc9").then((todo) => {
//     console.log(todo)
// });