const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const req = require('express/lib/request');
const res = require('express/lib/response');

const app = express();

// router
const categoriesRouter = require('./app/api/v1/categories/router');
const talentsRouter = require('./app/api/v1/talents/router');
const eventsRouter = require('./app/api/v1/events/router');
const paymentsRouter = require('./app/api/v1/payments/router');
const ticketsCategoriesRouter = require('./app/api/v1/ticket-categories/router');
const orderRouter = require('./app/api/v1/order/router');
const participantsRouter = require('./app/api/v1/participants/router');

const v1 = '/api/v1/cms';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to api Belajar Mern',
    });
});

app.use(v1, categoriesRouter);
app.use(v1, talentsRouter);
app.use(v1, eventsRouter);
app.use(v1, paymentsRouter);
app.use(v1, ticketsCategoriesRouter);
app.use(v1, orderRouter);
app.use(v1, participantsRouter);

module.exports = app;
