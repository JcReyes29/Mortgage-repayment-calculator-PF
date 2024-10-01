const form = document.querySelector('.form_calculator');
const viewResults = document.querySelector('.view_results');
const viewBlock = document.querySelector('.view_block');
const m = document.querySelector('#amount');
const a = document.querySelector('#years');
const i = document.querySelector('#interest');

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


    calculo();
    
})

/* Formulas para obtener el resultado */
function calculo() {

    M=0 //Pago mensual
    p= parseFloat(document.getElementById('amount').value); //Monto del prestamo
    r= parseFloat(document.getElementById('interest').value); //Tasa de interés mensual 
    n= parseFloat(document.getElementById('years').value); //Número total de pagos


    if (document.getElementById('repayment').checked) {
        r = r/100/12
        n=n*12
        let M = p * r * Math.pow(1 + r, n)/(Math.pow(1 + r,n)-1);
        M=M.toFixed(5);
        document.getElementById('monthly_pay').innerText = '$'+ M;
        document.getElementById('total_pay').innerText = '$'+ M*n;
        viewResults.classList.remove('hidden'); //Mostrar resultado
        viewBlock.classList.add('hidden');
    } else if (document.getElementById('interest_only').checked) {
        M = p*(r/(100*12));
        M = M.toFixed(5);
        document.getElementById('monthly_pay').innerText = '$'+ M;
        document.getElementById('total_pay').innerText = '$'+ M*n;
        viewResults.classList.remove('hidden');//Mostrar resultado
        viewBlock.classList.add('hidden');
    }

}

/* Funcion para validar inputs */

function validacion_inputs(nombre,valor) {
    
    console.log(valor);
    if (valor?.trim() === "" || !valor ) {
        form.elements[nombre].classList.add('error');
        return true;
        
    } else{
        form.elements[nombre].classList.remove('error');
    }
    
}
