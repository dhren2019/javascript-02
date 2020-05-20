// import { obtenerChistes } from './js/http-providers';

// import { obtenerUsuarios } from "./js/http-providers";

// import { init } from './js/usuarios-page';

// obtenerChistes().then( console.log)

// init();

// fetch ( jokeUrl )
// .then( resp.json() )
// .then( ({ id, value }) => {
//     console.log( id, value )
// 

    //estrae la respuesta en formato json
   // resp.json().then( ({ id, value }) => { //desestructura la data y extrae los valores de id y value

import * as CRUD from './js/crud-provider';

CRUD.getUsuario( 1 ).then( console.log)
