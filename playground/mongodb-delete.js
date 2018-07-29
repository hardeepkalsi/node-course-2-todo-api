//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //Does same as above, creates MongoClient and ObjectID variable based from mongodb module

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    // If error then err is not null, otherwise client contains DB connection methods
    if(err){
        return console.log("Unable to connect to MongoDB server")
    }
    console.log('Connected to MongoDB');
    const db = client.db('TodoApp');
    
    // db.collection('Users').deleteMany({name: 'Harry'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({_id: ObjectID("5b5ca99732a7ac02b02a80ff")}).then((result) => {
        console.log(result);
    });
    // Delete many
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // // findOneAndDelete
    // db.collection('Users').findOneAndDelete({completed: false}).then((result)=> {
    //     console.log(result);
    // })
    // db.collection('Todos').find().toArray().then((docs) =>{
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('No todos found')
    // });

    // client.close(); 
});