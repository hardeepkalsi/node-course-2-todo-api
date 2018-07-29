//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //Does same as above, creates MongoClient variable based on MongoClient property

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    // If error then err is not null, otherwise client contains DB connection methods
    if(err){
        return console.log("Unable to connect to MongoDB server")
    }
    console.log('Connected to MongoDB');
    const db = client.db('TodoApp');
    
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo', err)
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    //Insert new doc into Users (name, age, location) collection
    db.collection('Users').insertOne({
        name: 'Harry',
        age: 24,
        location: 'Los Angeles'
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert todo', err)
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});