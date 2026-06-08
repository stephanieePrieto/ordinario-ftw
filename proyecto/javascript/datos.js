const formulario = document.getElementById("formulario-envio");
const btnRegresar = document.getElementById("btn-regresar-carrito");

function volverAlCarrito() {
    window.location.href = "carrito.html";
}

function procesarEnvio(evento) {
    evento.preventDefault();

    const nombreCliente = document.getElementById("nombre-cliente").value;
    const numeroTarjeta = document.getElementById("tarjeta-numero").value;

    if (numeroTarjeta.length < 16) {
        alert("Por favor, introduce un número de tarjeta válido (16 dígitos).");
        return; 
    }
    alert("¡Gracias por tu compra, " + nombreCliente + "! Tu pago con tarjeta ha sido autorizado con éxito.");


    window.productosEnBolsa = [];

    window.location.href = "index.html";
}

btnRegresar.addEventListener("click", volverAlCarrito);
formulario.addEventListener("submit", procesarEnvio);