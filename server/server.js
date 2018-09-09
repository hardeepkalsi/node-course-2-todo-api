var express = require('express');
var bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos}); 
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }

    Todo.findById(id).then((todo) => { // Check if no todo returned because even if id is valid, something wont always be in the db
        if(!todo){
            return console.log('No todo found');
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
})

app.delete('/todos/:id', (req, res) => {
    //get the id
    var id = req.params.id
    // validate the id
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    //remove todo by id
    Todo.findByIdAndRemove(id).then((todo) =>{
        if(!todo){ //Runs if nothing was deleted because it still resolves even if 0 docs deleted
            return res.status(404).send();
        }
        res.status(200).send(todo);
    }).catch((e) => {
        res.status(400).send();
    });
        //success
            //if no doc send 404
            //if doc send doc and 200
        //error
            //400 with empty body
});

app.listen(port, () => {
    console.log(`Started on ${port}`);
});

module.exports = {app};