//definir variable de entorno
let endPoint = '';
if (window.location.hostname === 'localhost' ) {
    endPoint = 'http://localhost:8080/api';
} else {
    endPoint = 'https://my-backend-rgfdev.herokuapp.com/api';
}

const getData = async ( typeData ) => {
    console.log( endPoint );
    try {
        const response = await fetch( `${ endPoint }/${ typeData }`);
        return await response.json();
    } catch ( err ) {
        console.log( err );
    }
}

async function saveStudent ( student ) {
    try {
        const response = await fetch(endPoint + '/save', {
            method: 'POST',
            body: JSON.stringify( student ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        console.log( response.status );

    } catch ( err ) {
        throw err;
    }
}

const deleteStudent = async ( idStudent ) => {
    try {
        const response = await fetch(`${ endPoint }/${ idStudent }`, {
            method: 'DELETE'
        });
        console.log( response.status );
        //no return in backend
    } catch (err) {
        console.log( err );
    }
}

const updateStudent = async ( student ) => {
    try {
        const response = await fetch(`${ endPoint }/update`, {
            method: 'PUT',
            body: JSON.stringify( student ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        console.log( response.status );
        return await response.json();
    } catch (err) {
        console.log( err );
    }
}

const getStudentById = async ( id ) => {
    try {
        const response = await fetch( `${ endPoint }/${ id }`);
        console.log( response.status );
        return  await response.json();
    } catch (err) {
        console.log( err );
    }
}

const getStudentsByAge = async ( age ) => {
    try {
        const response = await fetch( `${ endPoint }/age/${ age }`);
        return await response;
    } catch ( err ) {
        console.log( err );
    }
}

const getLogs = async () => {
    try {
        const response = await fetch( `${ endPoint }/getLogs`);
        return await response.json();
    } catch ( error ) {
        console.log( error );
    }
}

export {
    getData,
    saveStudent,
    deleteStudent,
    updateStudent,
    getStudentById,
    getStudentsByAge,
    getLogs
}


