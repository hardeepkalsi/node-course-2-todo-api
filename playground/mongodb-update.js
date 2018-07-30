//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //Does same as above, creates MongoClient and ObjectID variable based from mongodb module

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    // If error then err is not null, otherwise client contains DB connection methods
    if(err){
        return console.log("Unable to connect to MongoDB server")
    }
    console.log('Connected to MongoDB');
    const db = client.db('TodoApp');
    
    // db.collection('Todos').findOneAndUpdate({_id: ObjectID("5b5d4b98ab7b59328c064a69")}, {$set:{completed: true}}, {returnOriginal: false})
    //     .then((result) => {
    //         console.log(result);
    //     });
    db.collection('Users').findOneAndUpdate({_id: ObjectID("5b29f791aed567072c246632")}, {$set:{name: 'Charlie'}, $inc:{age: 1}}, {returnOriginal: false})
        .then((result) => {
            console.log(result);
        });
    // client.close(); 
});