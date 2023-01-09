const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
var mongoose = require("mongoose");

// Import server
var server = require('../config/app/app');

// Import Todo Model
var { User } = require("../model/index");

// use chaiHttp for making the actual HTTP requests        
chai.use(chaiHttp);

describe('Auth service API', function () {
    const randomString = Math.floor(Math.random() * 100);
    it('should Register user', function (done) {
        chai.request(server)

            // register request
            .post('/auth/register')

            // send user registration details
            .send({
                'firstName': 'test',
                'lastName': 'test',
                'email': randomString + '@gmail.com',
                'password': 'Test@123',
                "organizationName": "Kroger"
            }

            ) // this is like sending $http.post or this.http.post in Angular
            .end((err, res) => { // when we get a resonse from the endpoint
                // in other words,
                // the res object should have a status of 201
                res.should.have.status(200);
                done();
            })
    }),
    it('should able to login',function(done){
        // follow up with login
        chai.request(server)
        .post('/auth/login')
        // send user login details
        .send({
            'email': randomString + '@gmail.com',
            'password': 'Test@123',
        })
        .end((err, res) => {
            res.should.have.status(200);

            console.log('this runs the login part');
            res.body.data.should.have.property('token') 
            done();
            // var token = res.body.data.token;

            // follow up with requesting user protected page
        })
    })

})