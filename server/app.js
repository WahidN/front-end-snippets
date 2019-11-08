const express = require('express');
const path = require('path');
const app = express();
const snippetRoutes = require('./routes/snippets');
const mongoose = require('mongoose');

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());

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
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Origin');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Hande routes
app.use('/', snippetRoutes);

// handle 404 errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// handle other errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


// connect to DB
mongoose
    .connect('mongodb+srv://fes-admin:d7zZ9dpvJBAPUVHb@fes-database-ub9vh.mongodb.net/snippets?retryWrites=true&w=majority', {
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