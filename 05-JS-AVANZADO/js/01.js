

//This con implicit binding

const usuario = {
    nombre: 'Juan',
    edad: 20,
    presentacion(){
        console.log(`Mi nombre es ${this.nombre} y tengo ${this.edad}`);
    }, 
    mascota:{
        nombre: 'Firulais',
        edad: 1,
        presentacion(){
            console.log(`Mi nombre es ${this.nombre} y tengo ${this.edad}`);
        }
    }

}

usuario.presentacion();
usuario.mascota.presentacion();


// function persona(nombre) {
//     console.log(`hola soy ${nombre}`);
// }

// persona('Rodrigo');
