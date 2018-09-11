const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
},  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 999
}];

beforeEach((done)=> {
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create new todo', (done) => {
        var text = 'Test todo';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text); //Expects response object to contain text we POSTed to server
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find({text}).then((todos) => { //Changed to only check for 'Test todo'
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));

            })
    });

    it('should not create new todo with invalid body data', (done)=> {
        request(app)
            .post('/todos')    
            .send({})
            .expect(400)
            .end((err, res)=> {
                if(err){
                    return done(err);
                } //Dont go to the DB section done here if error
            
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2); //Should only be 2 things in DB
                    done();
                }).catch((e) => done(e));
            });
    });

});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    })
})

describe('GET /todos/:id', () =>{
    it('should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return a 404 if todo not found', (done)=> {
        request(app)
        .get(`/todos/${new ObjectID().toHexString}`)
        .expect(404)
        .end(done);
    });

    it('should return a 404 if todo not found', (done)=> {
        request(app)
        .get(`/todos/1234`)
        .expect(404)
        .end(done);
    });
})

describe('DELETE /todo/:id', () => {
    it('should remove a todo', (done) => {
        var hexID = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.findById(hexID).then((todo) => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 404 if not found', (done) => {
        request(app)
        .delete(`/todos/${new ObjectID().toHexString}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 if objectID is invalid', (done) => {
        request(app)
        .delete(`/todos/1234`)
        .expect(404)
        .end(done);
    });
})

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done)=> {
        // grab id of first item
        var body = {text: "Updated todo test", completed: true}
        // update text, set completed to true
        request(app)
        .patch(`/todos/${todos[0]._id}`)
        .send(body)
        .expect(200)
        .expect((res) => {
            //console.log(res);
            //console.log(res.body.todo);
            expect(res.body.todo.text).toBe(body.text);
            expect(res.body.todo.completed).toBe(true);
            expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end(done);
        // assert 200 status
        // assert body contains text you sent, completed is true, completed at is #
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var body = {text: "Updated second todo test", completed: false}

        request(app)
        .patch(`/todos/${todos[1]._id}`)
        .send(body)
        .expect(200)
        .expect((res) => {
            //console.log(res);
            //console.log(res.body.todo);
            expect(res.body.todo.text).toBe(body.text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toBeFalsy();
        })
        .end(done);
        // grab id of second todo
        // update text, set completed to false
        // assert 200
        // assert body contains text, completed is false, completed at is null toNotExist falsey
    });
});