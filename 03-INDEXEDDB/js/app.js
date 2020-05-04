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
        mostrarCitas();
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
            mostrarCitas();
        }
        transaction.onerror = () => {
            console.log('hubo un error');
        }
    }
    function mostrarCitas() {
        //limpiar las citas anteriores
        while (citas.firstChild) {
            citas.removeChild(citas.firstChild);

        }
        //creamos un objectstore
        let objectStore = Db.transaction('citas').objectStore('citas');


        //devuelve una peticion
        objectStore.openCursor().onsuccess = function (e) {
            //cursor se va ha ubicar en el registro indicado para acceder a los datos
            let cursor =  e.target.result;

            if (cursor) {
                let citaHTML = document.createElement('li');
                citaHTML.setAttribute('data-cita-id', cursor.value.key);
                citaHTML.classList.add ('list-group-item');

                citaHTML.innerHTML = `
                    <p class = "font-weight-bold">Mascota: <span class = "font-weight-normal">${cursor.value.mascota}</span></p>
                    <p class = "font-weight-bold">cliente: <span class = "font-weight-normal">${cursor.value.cliente}</span></p>
                    <p class = "font-weight-bold">Teléfono: <span class = "font-weight-normal">${cursor.value.telefono}</span></p>
                    <p class = "font-weight-bold">Fecha: <span class = "font-weight-normal">${cursor.value.fecha}</span></p>
                    <p class = "font-weight-bold">Hora: <span class = "font-weight-normal">${cursor.value.hora}</span></p>
                    
                    <div class="card" style="width: 18rem;">
                  
                    <div class="card-body">
                        <h5 class="font-weight-normal">Síntomas:</h5>
                        <p class="font-weight-normal">${cursor.value.sintomas}</a>
                    </div>
                    </div><br>
                `;
                //boton de borrar
                const btnBorrar = document.createElement('button');
                btnBorrar.classList.add('borrar', 'btn', 'btn-danger');
                btnBorrar.innerHTML = '<span aria-hidden = "true">X</span> Borrar';
                btnBorrar.onclick = borrarCita;
                citaHTML.appendChild(btnBorrar);
                //append en el padre 
                citas.appendChild(citaHTML);
                //consultar los proximos registros
                cursor.continue();
            } else {
                if (!citas.firstChild) {
                    //cuando no hay registros
                headingAdministra.textContent = ' Agrega citas para comenzar';
                let listado = document.createElement('p');
                listado.classList.add ('text-center');
                listado.textContent = 'No hay registros';
                citas.appendChild(listado);
                } else {
                    headingAdministra.textContent = 'Administra tus citas';
                     }
                }
             }

       }
       function borrarCita (e) {
           let citaId = Number (e.target.parentElement.getAttribute('data-cita-id'));

           
        //en indexDb se utilizan las transacciones
        let transaction = Db.transaction( ['citas'], 'readwrite');
        let objectStore = transaction.objectStore('citas');
        let peticion    = objectStore.delete(citaId);

        transaction.oncomplete = () => {
            e.target.parentElement.parentElement.removeChild( e.target.parentElement);
                console.log('Se eliminó correctamente');
            if (!citas.firstChild) {
                //cuando no hay registros
            headingAdministra.textContent = ' Agrega citas para comenzar';
            let listado = document.createElement('p');
            listado.classList.add ('text-center');
            listado.textContent = 'No hay registros';
            citas.appendChild(listado);
            } else {
                headingAdministra.textContent = 'Administra tus citas';
                 }
            }
         }
        
})