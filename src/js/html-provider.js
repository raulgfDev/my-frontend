import * as CRUD from './crud';

let fId = document.querySelector('#fId'),
    fName = document.getElementById('fName'),
    fFirstName = document.getElementById( 'fFirstName' ),
    fAge = document.getElementById( 'fAge' ),
    fTelephone = document.getElementById( 'fTelephone' ),
    fCountry = document.getElementById( 'fCountry' ),
    fSubjects = document.getElementsByClassName( 'subjects' ),
    fPostCode = document.getElementById( 'fPostCode' ),
    spanTotalPrice = document.querySelector( '#total-price'),
    viewLogs = document.querySelector( '#view-logs' ),
    viewValues = document.querySelector('#view-values');

function renderStudents( students ) {

    let render = "<tr><th>NAME</th><th>FIRSTNAME</th><th>AGE</th><th>COUNTRY</th></tr>";
    for( let i = 0; i < students.length; i++ ){
        render += `<tr><td>${ students[i].name }</td>
            <td>${ students[i].firstName }</td>
            <td>${ students[i].age }</td>
            <td>${ students[i].country.name }</td>
            <td><button class="btnDetail" value="${ students[i].id }">Detalle</button></td></tr>`
    }
    document.getElementById("myTable").innerHTML = render;
}

const renderSubjects = async() => {
    const subjects = await CRUD.getData( 'subjects' );
    let render = '';
    for (let subject of subjects) {
        render += `<input class="subjects" type="checkbox" value="${ subject.id }" id="${ subject.name }">
            <label for="${ subject.name }">${ subject.name }</label><br>`
    }
    document.getElementById( 'subjects').innerHTML = render;
}

const renderCountries = async() => {
    const countries = await CRUD.getData ( 'countries' );
    let render = '';
    for (let country of countries) {
        render += `<option value="${ country.id }">${ country.name }</option>`
    }
    document.getElementById( 'fCountry' ).innerHTML = render;
}

const renderPage = async () => {
    await renderStudents( await CRUD.getData( 'all' ));
    await renderCountries();
    await renderSubjects();
}

const createFormStudent = () => {
    const student = {
        country : {},
        subjects : []
    };
    student.id = fId.value;
    student.name = fName.value;
    student.firstName = fFirstName.value;
    student.age = parseInt( fAge.value );
    student.telephone = fTelephone.value;
    student.country.id = fCountry.value;
    const subjects = fSubjects;
    for ( let i = 0; i < subjects.length; i++ ) {
        if ( subjects[i].checked) {
            student.subjects.push( { id : subjects[i].value } );
        }
    }
    student.postCode = fPostCode.value;
    return student;
}

const updateFormStudent =  ( student ) => {
    fId.value = student.id;
    fName.value = student.name;
    fFirstName.value = student.firstName;
    fAge.value = student.age;
    fTelephone.value = student.telephone;
    fCountry.value = student.country.id;
    const subjects = fSubjects;
    for ( let i = 0; i < student.subjects.length; i++ ) {
        for ( let j = 0; j < subjects.length; j++ ) {
            if ( student.subjects[i].name === subjects[j].id ) {
                subjects[j].checked = true;
            }
        }
    }
    fPostCode.value = student.postCode;
    spanTotalPrice.innerText =
        `Total Price of Subjects ${ student.totalPriceSubjects } €.`;
}

const renderLogs = async () => {

    const logs = await CRUD.getData( 'getLogs' );
    let render = '<tr><th>ID</th><th>NAME</th><th>TIME</th><th>DATE</th><th>REVIEW</th></tr>';
    for ( let log of logs ) {
        render += `<tr class="${ (log.review ) ? 'red' : '' }">
            <td>${ log.id }</td>
            <td>${ log.nameMethod }</td>
            <td>${ log.timeMethod }</td>
            <td>${ log.fecha }</td>
            <td>${ log.review }</td></tr>`
    }
    viewLogs.innerHTML = render;
}

const deleteLogs = () => {
    viewLogs.innerHTML = '';
}

const renderValues = async () => {
    const values = await CRUD.getData( 'values')
    let render = '<tr><th>ID</th><th>CLOSE</th><th>DATE</th><th>EXCHANGE</th><th>SYMBOL</th></tr>';
    for ( let value of values ) {
        render += `<tr><td>${ value.id }</td>
            <td>${ value.close }</td>
            <td>${ value.date }</td>
            <td>${ value.exchange }</td>
            <td>${ value.symbol }</td></tr>`
    }
    viewValues.innerHTML = render;
}

export {
    renderStudents,
    renderPage,
    createFormStudent,
    updateFormStudent,
    renderLogs,
    deleteLogs,
    renderValues
}

