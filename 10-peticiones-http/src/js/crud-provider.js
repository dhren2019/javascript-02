



const urlCrud = 'https://reqres.in/api/users';

const getUsuario = async ( id ) => {

    const resp = fetch ( `${ urlCrud }/${ id }`);
    const data = await resp.json();
        return data;
}

export{
    getUsuario
}