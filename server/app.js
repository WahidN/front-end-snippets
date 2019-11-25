const express = require('express');
const path = require('path');
const csrf = require("csurf");
const session = require('express-session');
const MongodbStore = require('connect-mongodb-session')(session);
const app = express();
const snippetRoutes = require('./routes/snippets');
const adminRoutes = require('./routes/admin');
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://fes-admin:d7zZ9dpvJBAPUVHb@fes-database-ub9vh.mongodb.net/snippets?&w=majority";
const SESS_TIME = 1000 * 60 * 60 * 2; // two minutes
const store = new MongodbStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'sessionSecretToken',
    cookie: {
        maxAge: SESS_TIME,
        secure: false
    },
    store: store
}));

// handle static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Handle cors
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Origin, Authorization');
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
    .connect(MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('DB Connected!');
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        });
    })
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });