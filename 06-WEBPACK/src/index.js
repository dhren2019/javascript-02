import ' .../css/style.css';

class Cliente {
    constructor ( nombre) {
        this.nombre = nombre;
    }
}

const cliente = new Cliente('Juan');
console.log(cliente);