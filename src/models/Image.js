const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    name: String, //nome da image
    size: Number, // tamanho da image
    key: String,  // hash + nome original image
    url: String,  // url da image
    createdAt:{
        type: Date, //tipo data
        default: Date.now, // pegar a data de hoje
    }

});

module.exports = mongoose.model("Image", ImageSchema);