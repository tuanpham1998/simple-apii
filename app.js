const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const user = require('./api/routes/user');
const ao = require('./api/routes/ao/ao');
const styleAo = require('./api/routes/ao/style-ao');
const quan = require('./api/routes/quan/quan');
const styleQuan = require('./api/routes/quan/style-quan');

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
    console.log('DB connected')
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header(
        "Access-Control-Allow-Header",
        "Origin, X-requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Method", "GET, POST, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
})

app.use('/user', user);
app.use('/ao', ao);
app.use('/styleAo', styleAo);
app.use('/quan', quan);
app.use('/styleQuan', styleQuan);

//catch error 
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})


module.exports = app;