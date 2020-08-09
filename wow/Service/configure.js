bodyParser = require('body-parser');
require('dotenv').config();
const routes = require('./Routes');
let express = require('express');
cookieParser = require('cookie-parser');
morgan = require('morgan');
let path = require('path');
const Pusher = require('pusher');
methodOverride = require('method-override');
errorHandler = require('errorhandler');
let cors = require('cors');
module.exports =
    function (app) {
        app.use(morgan('dev'));
        app.use(bodyParser());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(methodOverride());
        app.use(cors({
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204

        }));


        const pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.PUSHER_KEY,
            secret: process.env.PUSHER_SECRET,
            cluster: process.env.PUSHER_CLUSTER,
            encrypted: true,
        });
        app.use(cookieParser('some-secret-value-here'));
        app.use("/api/asset", express.static(path.join(__dirname, '..', 'asset')));
        console.log(path.join(__dirname, '..', 'asset'));
        routes(app);

        if ('development' === app.get('env')) { app.use(errorHandler()); }
        return app;
    };