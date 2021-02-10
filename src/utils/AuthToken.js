const crypto = require('crypto');
const generateAuthToken =  () => {
    const token =  crypto.randomBytes(30).toString('hex');
    console.log(token);
   return(token);
};
module.exports = { generateAuthToken};