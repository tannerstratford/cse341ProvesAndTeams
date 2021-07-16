const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();

const router = express.Router();

app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));


module.exports = router;