const axios = require('axios');
const { raw, response } = require('express');

const Place = require('../models/Place');
const { index } = require('../models/utils/PointSchema');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

//index, store, show, update, destroy  

module.exports =  {
    async index(req, res){

        const places =  await Place.find();
       // console.log(places);

        return res.json(places);
    },
    async show(req, res){
        const placeId = req.params.id;
        await Place.findById(placeId)
        .then(response => {res.status(200).json(response)})
        .catch(err => res.status(400).send("Lugar não encontrado na base de dados"))

    },
    async store(req, res){   
        // name, imageProfile, description, url, galery, pros, contra,     
        console.log(req);
    
        const { 
                name, 
                imageProfileId, 
                description, 
                location: url = '',
                positivePoints, 
                negativePoints,
                albumId,
                latitude,
                longitude } = req.body;

        //console.log(req.body);

        //Checar se o registro já existe
        let place;
        await Place.findOne({name}).then(response => place = response).catch(err => console.log(err));
       // console.log(place);
        if(place){  
            res.status(201).send({message: "Local já cadastrado"})
        }      
    
            const positivePointsArray = parseStringAsArray(positivePoints);
            const negativePointsArray = parseStringAsArray(negativePoints);
    
            const location = {
                type: 'Point',
                coordinates: [ longitude, latitude]
            }

            place = await Place.create({  
                                                      
                                        name,
                                        imageProfileId,
                                        description,
                                        url: '',
                                        positivePoints: positivePointsArray,
                                        negativePoints: negativePointsArray,
                                        albumId,
                                        latitude,
                                        longitude
                                
                                    });
            // Filtrar as conexões  que estão em no máximo 10km de distância 
            // e que o novo place tenha pelo menos umas das tecnologias filtradas.
           /*  const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            ) 
            sendMessage(sendSocketMessageTo, 'newPlace', place) */
            // console.log(sendSocketMessageTo); 
              
        return(
            res.status(200).json(place)
        );
    },
    async update(req, res){
        const placeId = req.params.id;
        const { 
            name, 
            imageProfileId, 
            description, 
            positivePoints, 
            negativePoints,
            albumId,
            latitude,
            longitude } = req.body;        
        

        positivePoints = parseStringAsArray( positivePoints);
        negativePoints = parseStringAsArray( negativePoints);

        const location = {
            type: 'Point',
            coordinates: [ longitude, latitude]
        }
        //const update = _.assign({ "updatedAt": new Date() }, req.body);
        place = await Place.update({_id:placeId}, { 
            name, 
            imageProfileId, 
            description, 
            positivePoints, 
            negativePoints,  
            albumId,
            latitude,
            longitude},  function(err, place) {
                            if (err) {
                            res.status(400).send(err);
                            }
                            res.status(200).json(place);
                        }
        );
         
    },
    async delete(req, res){
       // const place = await Place.findById(req.params.id);
        findByIdAndRemove(req.params.id, (err, place) => {
            err 
            ? res.status(400).send(err) 
            : res.status(200).json(place)
        })
       // await place.remove();
       // return res.send("Place deletado");
    }
}

