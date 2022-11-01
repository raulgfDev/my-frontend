import {renderStudents,
        updateFormStudent,
        renderPage,
        createFormStudent,
        renderLogs,
        deleteLogs,
        renderValues}
    from './html-provider';
import * as CRUD from './crud';

const btnSearch = document.querySelector('#btnSearch'),
    btnCreate = document.getElementById("createStudent"),
    btnAll = document.querySelector('#btnAll'),
    btnUpdate = document.querySelector('#btn-update'),
    btnDelete = document.querySelector('#btn-delete'),
    btnShowLogs = document.querySelector( '#show-logs' ),
    btnHideLogs = document.querySelector( '#hide-logs' ),
    btnShowValues = document.querySelector('#show-values'),

    exitDetail = document.querySelector('#exit-detail'),
    fieldSet = document.querySelector('#field-set'),
    legend = document.querySelector('#legend');

let ageSearch = document.getElementById('ageIn'),
    spanTotalPrice = document.querySelector( '#total-price');

const form   = document.getElementById('miForm'),
      inputs = document.getElementsByClassName('input-form');
let fId = document.querySelector('#fId');

//methods for events
const enterDetailMode = () => {
    form.reset();
    fieldSet.style.borderColor = 'red';
    legend.innerText = 'DETAIL MODE';
    for ( let input of inputs ) {
        input.style.background = 'lightcyan';
    }
    btnCreate.disabled = true;
    btnUpdate.style.display = 'inline';
    btnDelete.style.display = 'inline';
    exitDetail.style.display = 'inline';
    btnSearch.disabled = true;
    btnAll.disabled = true;
    ageSearch.disabled = true;
}

const exitDetailMode = () => {
    form.reset();
    fieldSet.style.borderColor = 'transparent';
    legend.innerText = '';
    for ( let input of inputs ) {
        input.style.background = 'white';
    }
    btnCreate.disabled = false;
    btnUpdate.style.display = 'none';
    btnDelete.style.display = 'none';
    exitDetail.style.display = 'none';
    btnSearch.disabled = false;
    btnAll.disabled = false;
    ageSearch.disabled = false;
    spanTotalPrice.innerText = '';
}

//events
const createStudent = () => {
    btnCreate.addEventListener('click', async () => {
        if ( !confirm( 'Are you sure CREATE this student') ) return;
        await CRUD.saveStudent( createFormStudent() );
        renderStudents( await CRUD.getData( 'all' ));
        form.reset();
    });
}

const searchByAge = () => {
    btnSearch.addEventListener('click', async () => {
        const response = await CRUD.getStudentsByAge( ageSearch.value );
        if ( response.status === 404 ){
            renderStudents( await CRUD.getData( 'all' ));
            ageSearch.value = '';
            return  alert( 'There are not students with this age' );
        }
        renderStudents( await response.json() );
    });
}

const detailStudent = () => {
        //event delegation = https://roelmagdaleno.com/agrega-un-evento-en-multiples-elementos-con-event-delegation/
        document.addEventListener('click',async ( event) => {
            const clickedBtn = event.target;
            if ( !clickedBtn.matches('.btnDetail') ) return;
            enterDetailMode();
            updateFormStudent( await CRUD.getStudentById( clickedBtn.value ) );
        });
}

const showAllStudent = () => {
        btnAll.addEventListener( 'click', async () => {
        renderStudents( await CRUD.getData( 'all' ));
        ageSearch.value = '';
    });
}

const updateStudent = () => {
    btnUpdate.addEventListener('click', async () => {
        if ( !confirm('Are you sure UPDATE this student?') ) return;
        const changeStudent = createFormStudent();
        const student = await CRUD.updateStudent( changeStudent );
        if ( student ) {
            renderStudents( await CRUD.getData( 'all' ));
            exitDetailMode()
        }
    });
}

const deleteStudent = () => {
    btnDelete.addEventListener('click', async () => {
        if ( !confirm('Are you sure DELETE this student?') ) return;
        await CRUD.deleteStudent( fId.value );
        renderStudents( await CRUD.getData( 'all' ));
        exitDetailMode();
    });
}

const showLogs = () => {
    btnShowLogs.addEventListener( 'click', () => {
       renderLogs();
    });
}

const hideLogs = () => {
    btnHideLogs.addEventListener( 'click', () => {
        deleteLogs();
    });
}

const showValues = () => {
    btnShowValues.addEventListener( 'click', () => {
       renderValues();
    });
}

export const init = () => {

    window.addEventListener('load',  () =>  renderPage() );
    createStudent();
    searchByAge();
    detailStudent();
    showAllStudent();
    updateStudent();
    deleteStudent();
    showLogs();
    hideLogs();
    showValues();
    exitDetail.addEventListener('click', () => exitDetailMode());
}


