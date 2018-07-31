const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done)=> {
    Todo.remove({}).then(()=> done());
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

                Todo.find().then((todos) => {
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });

});