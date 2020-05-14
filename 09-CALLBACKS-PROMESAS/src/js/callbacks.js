const heroes = {
    capi: {
        nombre: 'Capitan america',
        poder: 'Superpoder'
    },
    capi: {
        nombre: 'ironman',
        poder: 'Superpoder'
    },
    capi: {
        nombre: 'spiderman',
        poder: 'Superpoder'
    }

}

export function buscarHeroe(id, callback) {
    
    const heroe = heroes[id];

    if ( heroe ) {
        
        callback( null, heroe );//el heroe solo va a venir si se encuentra que tiene que coincidir con el id const heroeId = 'capi';
    } else {
        //un error
        callback(`no existe un heroe con el id $ { id}`);
    }
    // callback ( heroe);
}