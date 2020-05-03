let Db;


//selectores de la interfaz 
const form = document.querySelector('form'),
      nombreMascota = document.querySelector('#mascota'),
      nombreCliente = document.querySelector('#cliente'),
      telefono = document.querySelector('#telefono'),
      fecha    = document.querySelector('#fecha'),
      hora     = document.querySelector('#hora'),
      sintomas = document.querySelector('#sintomas'),
      citas    = document.querySelector('#citas'),
      headingAdministra    = document.querySelector('#administra')

    
//Esperar DOM ready
document.addEventListener('DOMContentLoaded', () => {
    //crear la base de datos
    let crearDB = window.indexedDB.open('citas', 1);//open toma dos valores uno que es un string (citas) y otro que es 1 que es la version

    //Si hay un err enviarlo a la consola 
    crearDB.onerror = function () {
        console.log('Hubo un error');
    }

    //si todo está bien entonces muestra en consola , y asigna la BBDD
    crearDB.onsuccess = function () {
        // console.log('Todo listo');

        //asignar la BBDD
        Db = crearDB.result;
        // // console.log(Db);
    }

    //este metodo solo corre una vez y es ideal para crear el schema
    crearDB.onupgradeneeded = function (e) {
        console.log('solo una vez');
        //EL EVENTO ES LA MISMA bbdd
        let db = e.target.result;

        //definir el objectstore, toma 2 parametros el nombre de la BBDD y segundo las opciones
        let objectStore = db.createObjectStore('citas', { keyPath: 'key', autoIncrement: true} );
        //crear los indices y campos de la BBDD, createIndex : 3 parametros , nombre, keyPath y opciones
        objectStore.createIndex( 'mascota', 'mascota',   { unique: false} );
        objectStore.createIndex( 'cliente', 'cliente',   { unique: false} );
        objectStore.createIndex( 'telefono', 'telefono', { unique: false} );
        objectStore.createIndex( 'fecha', 'fecha',       { unique: false} );
        objectStore.createIndex( 'hora', 'hora',         { unique: false} );
        objectStore.createIndex( 'sintomas', 'sintomas', { unique: false} );

        console.log('BBDD creada y lista!');

    }

    //cuando el form se envia
    form.addEventListener('submit', agregarDatos);
    function agregarDatos(e) {
        e.preventDefault();

        const nuevaCita = {
            mascota : nombreMascota.value,
            cliente : nombreCliente.value,
            telefono: telefono.value,
            hora    : hora.value,
            sintomas: sintomas.value

        }
        // console.log(nuevaCita);

        //en indexDb se utilizan las transacciones
        let transaction = Db.transaction( ['citas'], 'readwrite');
        let objectStore = transaction.objectStore('citas');
        let peticion    = objectStore.add(nuevaCita);

        peticion.onsuccess = () => {
            form.reset();
        }
        transaction.oncomplete = () => {
            console.log('Cita agregada');
        }
        transaction.onerror = () => {
            console.log('hubo un error');
        }
    }
})