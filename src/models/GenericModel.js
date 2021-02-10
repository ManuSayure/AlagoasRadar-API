const mongoose = require('mongoose');

/**Schema */ 

const GenericSchema = new mongoose.Schema({

});

/**Export Schema */

module.exports = mongoose.model( "Generic", GenericSchema );