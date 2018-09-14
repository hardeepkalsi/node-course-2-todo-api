require('./config/config')
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

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
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
        //success
            //if no doc send 404
            //if doc send doc and 200
        //error
            //400 with empty body
});

app.patch('/todos/:id', (req, res) => {  // Takes PATCH command and individual ID with body containing text and completed then updates that todo and sets date if completed is true
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']); // Subset of things user passed in, body which will contain object attributes and we can set it directly to db. Doesnt let user set system params like completedAt

    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }

    if(_.isBoolean(body.completed) && body.completed){ //Runs if completed is a boolean and true
        body.completedAt = new Date().getTime(); // # of milliseconds from Unix epoch 1970
    } 
    else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=> { 
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

app.listen(port, () => {
    console.log(`Started on ${port}`);
});

module.exports = {app};