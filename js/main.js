const form = document.querySelector('.form_calculator');
const viewResults = document.querySelector('.view_results');
const viewBlock = document.querySelector('.view_block');
const m = document.querySelector('#amount');
const a = document.querySelector('#years');
const i = document.querySelector('#interest');
const input1 = document.querySelector('label[for="amount"]');
const input2 = document.querySelector('label[for="years"]');
const input3 = document.querySelector('label[for="interest"]');
const input4 = document.querySelector('label[for="interest_only"]');


m.addEventListener('input', () => {
    m.value = m.value.replace(/[^0-9]/, "")
})
a.addEventListener('input', () => {
    a.value = a.value.replace(/[^0-9]/, "")
})
i.addEventListener('input', () => {
    i.value = i.value.replace(/[^0-9]/, "")
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formdata = new FormData(form);
    /* Valor + nombre   */
    const monto = formdata.get('amount');
    const años = formdata.get('years');
    const interes = formdata.get('interest');
    const seleccion = formdata.get('option');

    validacion_inputs('amount', monto);
    validacion_inputs('years', años);
    validacion_inputs('interest', interes);
    validacion_inputs('interest_only', seleccion);
    console.log(validacion_inputs('amount', monto))

    calculo();
})

/* Formulas para obtener el resultado */
function calculo() {

    p = parseFloat(document.getElementById('amount').value); //Monto del prestamo
    r = parseFloat(document.getElementById('interest').value); //Tasa de interés mensual 
    n = parseFloat(document.getElementById('years').value); //Número total de pagos


    if (document.getElementById('repayment').checked) {
        r = r / 100 / 12
        n = n * 12
        let M = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        M = M.toFixed(5);
        document.getElementById('monthly_pay').innerText = '$' + M;
        document.getElementById('total_pay').innerText = '$' + M * n;
        viewResults.classList.remove('hidden'); //Mostrar resultado
        viewBlock.classList.add('hidden');
        return;
    } else if (document.getElementById('interest_only').checked) {
        r = r / 100 / 12
        n = n * 12
        let M = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        MI = (p - n) / M;
        TI = (M * n) - p;
        document.getElementById('monthly_pay').innerText = '$' + MI.toFixed(5);
        document.getElementById('total_pay').innerText = '$' + TI;
        viewResults.classList.remove('hidden');//Mostrar resultado
        viewBlock.classList.add('hidden');
        return;
    }

}

/* Funcion para validar inputs */

function validacion_inputs(nombre, valor) {

    if (valor?.trim() === "" || !valor) {
        input1.classList.add('error');

    } else {
        input1.classList.remove('error');
    }
    if (valor?.trim() === "" || !valor) {
        input2.classList.add('error');


    } else {
        input2.classList.remove('error');
    }
    if (valor?.trim() === "" || !valor) {
        input3.classList.add('error');


    } else {
        input3.classList.remove('error');
    }
    if (valor?.trim() === "" || !valor) {
        input4.classList.add('error');


    } else {
        input4.classList.remove('error');
    }
    return true;
}

function cargar() {
    location.reload(true);
}


