const Place = require('../models/Place');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports ={
    async index(req, res ){
        //console.log(req.query);

        const{latitude, longitude, techs} = req.query;

        const techsArray = parseStringAsArray(techs);
 
        const places = await Place.find({
           /* techs:{
                $in:techsArray,
            },*/
            location:{
                $near:{
                    $geometry:{
                        type:'Point',
                        coordinates:[longitude, latitude],
                    },
                    $maxDistance: 10000,
                },               
            }
        }); 
       // const {devs} =  response;
        //console.log({devs});   
        //Buscar todos os devs num raio de 10km
        // Filtrar por tecnologias

        //const devs = await Dev.fin
        return res.json({devs});

    }
}