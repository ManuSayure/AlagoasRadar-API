const mongoose = require('mongoose');

/**Schema */ 

const UserSchema = new mongoose.Schema({
    username: String, //nome da image
    email: String,
    password: String,    
    url: String,  // url da image

    createdAt:{
        type: Date, //tipo data
        default: Date.now, // pegar a data de hoje
    }

});

/**Export Schema */

module.exports = mongoose.model( "User", UserSchema );

