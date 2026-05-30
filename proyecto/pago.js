const btnFinalizar = document.getElementById("btn-finalizar-compra");
const btnRegresar = document.getElementById("btn-regresar-datos");

function procesarPago(){
    let metodo = document.getElementById("metodo-seleccionado").value;
    let numeroTarjeta = document.getElementById("campo-tarjeta").value;
    let cvv = document.getElementById("campo-cvv").value;

    if (metodo == "tarjeta") {
        if (numeroTarjeta == "" || cvv == ""){
            alert("Por favor, introduce los datos de tu tarjeta para procesar el pago.");
            return;
        }
    }

    alert("Compra procesada con éxito! Tu Orden de Glow Tech ha sido confirmada.");

    window.location.href = "soporte.html";
}

function regresarAlFormulario(){
    window.location.href = "datos.html";
}

btnFinalizar.addEventListener("click", procesarPago);
btnRegresar.addEventListener("click", regresarAlFormulario);