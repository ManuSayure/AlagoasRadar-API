
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getHashedPassword = async (password) => {
    const hash =  await bcrypt.hashSync(password, saltRounds);
    return hash;
    
};

async function checkPassword(password, userPassword){
    const match = await bcrypt.compare(password, userPassword);
   // console.log(`match:${match}`)
    return match;
}

module.exports = {getHashedPassword, checkPassword};