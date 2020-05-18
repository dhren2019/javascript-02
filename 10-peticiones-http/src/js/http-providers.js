

const jokeUrl = 'https://api.chucknorris.io/jokes/random';



const obtenerChistes = async () => {

    try {
        const resp = await fetch( jokeUrl );
        
        if (!resp.ok ) throw 'No se pudo realizar la petición';
    
        // return await resp.json();
        const { icon_url, id, value } = await resp.json();
        
        return { icon_url, id, value };

    } catch (err) {
        
        throw err;
    }
    
} 


export {
    obtenerChistes
}
