
const User = require("../models/User");
const {getHashedPassword} = require('../utils/Criptografia');
const {checkPassword } = require('../utils/Criptografia')


module.exports = {
    async index(req, res){
        const users = await User.find();
        users ? res.json(users) : res.send("Não existem resgisto de usuários cadastrados");
    },
    async store(req, res){
 
        const { email, username, password } = req.body;

        //if( password === confirmPassword){
            let user = await User.findOne({email});
           console.log(user);

            if(user){
                res.send('Usuário já contém uma conta');
            }
            else{
                const hashPassword = await getHashedPassword(password);

                user = await User.create({
                    username,
                    email,
                    password: hashPassword,  
                });
                res.json(user);

            }          
        
   },

   async show(req, res){

        const userId = await User.findById(req.params.id);
        userId? res.json(userId) : res.send("Usuário não encontrado"); 
   },

   async updateName(req, res){

        const { id, username, password} = req.body;
        user =  await User.find(id);

       if(checkPassword(password, user.password)){           

                const user = await user.update({
                    username,
                });
                res.json(user);         
        }else {  
            res.send("Usuário não encontrado");
        }
    },
    async updatePassword(req, res){

        const { id, currentPassword, nextPassword,} = req.params;
        //if(currentPassword === currentConfirmPassword){

        user = await User.findById(id);
        console.log(getHashedPassword(nextPassword), checkPassword(currentPassword, user.password) );

        
        if(checkPassword(currentPassword, user.password)){
                const hashPassword = getHashedPassword(nextPassword);

               // user = await User.findById(id);
                user = await User.findOneAndUpdate(id, {password: hashPassword} )
                console.log(user);
                res.json(user);

        }     
        else{
            res.send("Sua senha está incorreta");
        }
    },
     
    async destroy(req, res){

        const userId = req.params.id;
        user = await User.findById(userId);
        await User.findOneAndRemove(userId).then(res.json(
        {
            user: user ,
            messagem:"Usuário removido com sucesso" })

        ).catch( res.json({
            user: null ,
            messagem:"Usuário removido com sucesso" })
        )
        //res.send("Usuário removido com sucesso");        
    }
 
 }



