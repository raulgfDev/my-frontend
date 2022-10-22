import { renderStudents, updateFormStudent, renderPage, createFormStudent } from './html-provider';
import * as CRUD from './crud';

const endPoint = "https://my-backend-rgfdev.herokuapp.com/api";

const btnSearch = document.querySelector('#btnSearch'),
    btnCreate = document.getElementById("createStudent"),
    btnAll = document.querySelector('#btnAll'),
    btnUpdate = document.querySelector('#btn-update'),
    btnDelete = document.querySelector('#btn-delete'),

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
        if (!confirm( 'Are you sure create this student')) return;
        await CRUD.saveStudent( createFormStudent() );
        await renderStudents();
        form.reset();
    });
}

const searchByAge = () => {
    btnSearch.addEventListener('click', () => {
        //without async-await
        fetch(`${ endPoint }/age/${ ageSearch.value }`)
            .then( response => {
                console.log( response.status );
                form.reset();
                if ( response.status === 404 ) {
                    ageSearch.value = '';
                    alert( 'There are not students with the request age');
                    return
                }
                return response.json()
            })
            .then( json =>  renderStudents( json ) )
            .catch( err => console.log( err.error ));
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
        await renderStudents();
        ageSearch.value = '';
    });
}

const updateStudent = () => {
    btnUpdate.addEventListener('click', async () => {
        if ( !confirm('Are you sure UPDATE this student?') ) return;
        const changeStudent = createFormStudent();
        const student = await CRUD.updateStudent( changeStudent );
        if ( student ) {
            await renderStudents();
            exitDetailMode()
        }
    });
}

const deleteStudent = () => {
    btnDelete.addEventListener('click', async () => {
        if ( !confirm('Are you sure DELETE this student?') ) return
        await CRUD.deleteStudent( fId.value );
        await renderStudents( await CRUD.getData('all') );
        exitDetailMode();
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
    exitDetail.addEventListener('click', () => exitDetailMode());
}


