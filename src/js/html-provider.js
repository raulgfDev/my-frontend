import { getData } from './crud';

let fId = document.querySelector('#fId'),
    fName = document.getElementById('fName'),
    fFirstName = document.getElementById( 'fFirstName' ),
    fAge = document.getElementById( 'fAge' ),
    fTelephone = document.getElementById( 'fTelephone' ),
    fCountry = document.getElementById( 'fCountry' ),
    fSubjects = document.getElementsByClassName( 'subjects' ),
    fPostCode = document.getElementById( 'fPostCode' ),
    spanTotalPrice = document.querySelector( '#total-price');

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

const renderSubjects = ( subjects ) => {
    let render = '';
    for (let subject of subjects) {
        render += `<input class="subjects" type="checkbox" value="${ subject.id }" id="${ subject.name }">
            <label for="${ subject.name }">${ subject.name }</label><br>`
    }
    document.getElementById( 'subjects').innerHTML = render;
}

const renderCountries = ( countries ) => {
    let render = '';
    for (let country of countries) {
        render += `<option value="${ country.id }">${ country.name }</option>`
    }
    document.getElementById( 'fCountry' ).innerHTML = render;
}

const renderPage = async () => {
    renderStudents( await getData( 'all' ) );
    renderCountries( await getData( 'countries' ) );
    renderSubjects( await getData( 'subjects' ) );
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

export {
    renderStudents,
    renderPage,
    createFormStudent,
    updateFormStudent
}

