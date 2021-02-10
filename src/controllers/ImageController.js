

//multer().array para pegar varias imagens ao mesmo tempo
const Image = require('../models/Image');
const { index } = require('../models/utils/PointSchema');

module.exports = {
    async store(req, res){ 
        const { originalname: name, size, key, location: url = ''} = req.file;
        console.log(req.file);

        await Image.create({
            name,
            size,
            key,
            url,
        })
        .then( response => res.status( 201 ).json(response) )
        .catch( err => res.status( 400 ).send(err) );    

    },
    async index(req, res){
        await Image.find().then( response => res.status( 200 ).json(response) )
        .catch( err => res.status( 400 ).send(err) );        
      
    },
    async show(req, res){

        const imageId = req.params.id;

        await Image.findById( imageId )
        .then( response => res.status( 200 ).json( response ) )
        .catch( err => res.status( 400 ).send("Imagem não encontrada na base de dados") )

    },
    async delete( req, res ){
        
       await Image.findByIdAndRemove( req.params.id )
       .then( response => res.status( 200 ).json( response ) )
       .catch( err => res.status( 500 ).send( err ) );

    }



}