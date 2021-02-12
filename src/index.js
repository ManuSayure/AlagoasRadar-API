
 const express = require('express');
 const mongoose = require('mongoose');
 const port = '3333';

const path = require('path'); 
require('dotenv').config();
//require('dotenv').config({ path: path.join(__dirname, '.env') });
console.log( path.join(__dirname, '.env'));
 //const password = require('../password.js') ;
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
 mongoose.connect( process.env.MONGO_URL, {   
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
   // console.log(`app listening on port http://localhost:${port}`)
    console.log(`app listening on servidor AWS`)
  });