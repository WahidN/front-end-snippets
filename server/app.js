const express = require('express');
const path = require('path');
const csrf = require('csurf');
const volleyball = require('volleyball');
const session = require('express-session');
const MongodbStore = require('connect-mongodb-session')(session);
const app = express();
const snippetRoutes = require('./routes/snippets');
const adminRoutes = require('./routes/admin');
const mongoose = require('mongoose');
require('dotenv').config();

// settings
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(volleyball);

// Handle cors
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // Request methods you wish to allow
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    // Request headers you wish to allow
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With, content-type, Origin, Authorization'
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Hande routes
app.use('/', snippetRoutes);
app.use('/', adminRoutes);

// connect to DB
mongoose
    .connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('DB Connected!');
        const port = process.env.PORT || 3300;
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        });
    })
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });