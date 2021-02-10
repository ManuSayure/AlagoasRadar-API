const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const PlaceScheema = new mongoose.Schema({
    name: {
        type:String,
        unique:true,
        required:true,
    },  
    imageProfileId: String,   

    description: {
        type: String,
        required: true,
    },      
    ulr: String,
    
    albumId: [String],

    positivePoints: [String],

    negativePoints: [String],
    
    location:{
        type: PointSchema,
        index: '2dsphere'
    }

});
module.exports = mongoose.model('Place', PlaceScheema);