 require('dotenv').config();

 const express = require('express');
 const mongoose = require('mongoose');
 const port = '3333';
 const password = require('../password.js') ;
 const routes = require('./routes');
 const cors = require('cors');
 const http = require('http');
 const {setupWebsocket} = require('./websocket');

 const app = express(); 
 const server = http.Server(app);

 app.use(express.static('public'));
 setupWebsocket(server);

 //'mongodb+srv://admin:'+password+'@cluster0.vbba4.mongodb.net/db?retryWrites=true&w=majority'
 //Mongo DB Atlas
 mongoose.connect( process.env.Mongo_URL, {   
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
});

 app.use(cors());
 app.use(express.json());
 //app.use(morgan('dev'));
 app.use(routes);
 
 
 server.listen(port, function () {
    console.log(`app listening on port http://localhost:${port}`)
  });