//window Binding

function obtenerAuto () {
    console.log(`Mi coche es de colot ${this.color}`);
}

const color = 'Negro';//Undefined 
window.color = 'Negro';//Color negro

obtenerAuto();