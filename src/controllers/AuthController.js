const { generateAuthToken} = require('../utils/AuthToken');
const { checkPassword,  getHashedPassword } = require('../utils/Criptografia');
const authTokens = {};
const User = require("../models/User");

module.exports = {
   async index(req, res){
      const list = await User.find();
      res.json(list);
   },
   async login(req, res){

    const { email, password } = req.body;
    console.log(email, password)
    await User.findOne({email}).then(
      response => {
        const user = response;

        if(checkPassword(password, user.password)){
          //console.log("auhTokrn")  
          const authToken = generateAuthToken();
          //console.log("auhTokrn 2")  
          authTokens[authToken] = user;
          //res.cookie('AuthToken', authToken);
          console.log('ok', authTokens);
          res.status(200).json({authToken:  authToken, user: user});
         
    
        } 
        else{
          res.status(500).json({message: "Senha ou email inválidos"})
    
        }

      }
    ).catch(err => console.log(err));
  
   
    

  },
  logout (req, res){
    const { email, password, token } = req.body;
    authTokens.slice(token);
    res.status(200).json({message: "logout concluído"})

  },
 /*  async show(req, res){
    const user;
    await User.findBy(req.body.id).then( response => {
      res.status(200).json(user = response)
    }).catch( err => {
      res.status(400).json({message: ""})
    })
   

  } */

}