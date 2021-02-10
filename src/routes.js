//import {Router} from 'express';
const {Router} = require('express');
const multer = require('multer');

const PlaceController =  require('./controllers/PlaceController');
const SearchController = require('./controllers/SearchController');
const ImageController = require('./controllers/ImageController');
const multerConfig = require('./config/multer');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');

const routes = Router();

 

 /** User */
routes.get('/users',           UserController.index ); //ok
routes.post('/users/register', UserController.store ); // ok
routes.get('/users/:id',       UserController.show ); //ok
routes.delete('/users/:id',    UserController.destroy ); // ok
routes.put('/users/id',        UserController.updateName);
routes.put('/users/:id',       UserController.updatePassword); 

/**Login */
routes.post('/users/login',  AuthController.login); // ok
routes.post('/users/logout', AuthController.logout);

/** Lugares */
routes.post('/places',              PlaceController.store );
routes.get('/places',               PlaceController.index );
routes.get('/places/show/:id',      PlaceController.show  );
routes.delete('/places/delete/:id', PlaceController.delete );

/** Search Lugares */
routes.get('/search', SearchController.index);

/** Images */
routes.post('/images',    multer(multerConfig).single('file'),  ImageController.store ); //ok
routes.get('/images',        ImageController.index ); //ok
routes.get('/images/show/:id',    ImageController.show); //ok
routes.delete('/images/:id', ImageController.delete ); //ok


module.exports = routes;