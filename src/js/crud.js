
const endPoint = 'http://localhost:8080/api';

const getData = async ( typeData ) => {
    try {
        const response = await fetch( `${ endPoint }/${ typeData }`);
        return await response.json();
    } catch ( err ) {
        console.log( err );
    }
}

async function saveStudent ( student ) {
    const response = await fetch(endPoint + '/save', {
        method: 'POST',
        body: JSON.stringify( student ),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    console.log( response.status );
    return await response.json();
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

export {
    getData,
    saveStudent,
    deleteStudent,
    updateStudent,
    getStudentById
}


