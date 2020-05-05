/**this con splicit binding */
function persona(el1, el2) {
    console.log(`Hola soy ${this.nombre} y me gusta el ${el1} y ${el2}`);
}

const informacion = {
    nombre: 'Juan',
    trabajo: 'Programador'
}

const generosMusicales = [ 'EDM','Techno'];
//splicit binding con call, cuando pasas un arreglo debes colocar todas las posiciones
persona.call(informacion, generosMusicales[0], generosMusicales[1]);

//splicit bindingcon .apply (si toma un arreglo )
persona.apply(informacion, generosMusicales);

//splicit binding con bind
const nuevaFn = persona.bind(informacion, generosMusicales[0], generosMusicales[1]);
nuevaFn();