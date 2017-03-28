'use strict';
// imports node modules
const express = require('express');
const express = require('mongojs');
const express = require('body-parser');
const express = require('jsonwebtoken');

// creates Express app with JSON body parser
const app = new express();
app.use(bodyParser.json());

// defines REST API (HTTP methods)
app.get('/', getTasks);
app.post('/', addTask);
app.delete('/', deleteTask);

// exports REST API.
module.exports = app;


// create a task and store it in MongoDB.
function addTask(req, res) {
    let userCollection = loadUserCollection(req.webtaskContext);

    // retrieves all tasks sorted by descending creation date
    userCollection.find().sort({ createdAt: -1}, (err, data) => {
        res.status(err ? 500 : 200).send(err || data);
    });
}

// delete/remove a task stored in MongoDB.
function deleteTask(req, res) {
    let userCollection = loadUserCollection(req.webtaskContext);

    // removes a task based on its id.
    userCollection.remove({_id: mongojs.ObjectId(req.query.id)}, () => res.end());
}

// retrieve a task from MongoDB.
// this function is responsible for securit and for the MongoDB connection.
// when a user issues a request to this API, the function verifies if the 'authorization'
// header sent was actually signed by Auth0. If none is sent, a non-friendly error is 
// generated. This is done with the jwt.verify function with the help of AUTH0_SECRET.
function loadUserCollection(webtaskContext) {
    // this secrets are configured wehn creating the Webtask
    const AUTH_SECRET = webtaskContext.secrets.AUTH0_SECRET;
    const MONGO_USER = webtaskContext.secrets.MONGO_USER;
    const MONGO_PASSWORD = webtaskContext.secrets.MONGO_PASSWORD;
    const MONGO_URL = webtaskContext.secrets.MONGO_URL;

    // removes the 'Bearer' prefix that comes in the authorization header
    let authorizationHeader = webtaskContext.headers.authorization;
    authorizationHeader = authorizationHeader.replace('Bearer ', '');

    // verifies token authenticity
    let token = jwt.verify(authorizationHeader, AUTH_SECRET);

    // connects to MongoDB and returns the user userCollection
    let mongodb = mongojs('${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}');
    return mongodb.collection(token.sub);
}