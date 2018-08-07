const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b5fcf20dd161d02b48b3d30';

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('ID not found');
//     }
//     console.log('Todo by id', todo);
// });

User.findById(id).then((user) => {
    if(!user){
        return console.log('Unable to find user.');
    }
    console.log(JSON.stringify(user, undefined, 2))
}, (err) => {
    console.log(err)
});