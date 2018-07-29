//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //Does same as above, creates MongoClient and ObjectID variable based from mongodb module

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    // If error then err is not null, otherwise client contains DB connection methods
    if(err){
        return console.log("Unable to connect to MongoDB server")
    }
    console.log('Connected to MongoDB');
    const db = client.db('TodoApp');
    
    // Runs query find all on collection Todos, converts to array then checks if promise completed
    // First parameter
    // db.collection('Todos').find({_id: ObjectID("5b23583e31f68019ec9fa4a8")}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Harry'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch users', err);
    });

    // client.close(); 
});