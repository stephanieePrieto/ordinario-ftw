const formulario = document.getElementById("formulario-envio");
const btnRegresar = document.getElementById("btn-regresar-carrito");

function volverAlCarrito() {
    window.location.href = "carrito.html";
}

function procesarEnvio(evento) {
    // Evitamos que el formulario refresque la página antes de tiempo
    evento.preventDefault();

    // Capturamos las variables del DOM
    const nombreCliente = document.getElementById("nombre-cliente").value;
    const numeroTarjeta = document.getElementById("tarjeta-numero").value;

    // Validación extra opcional: Comprobar que la tarjeta simule tener 16 números
    if (numeroTarjeta.length < 16) {
        alert("Por favor, introduce un número de tarjeta válido (16 dígitos).");
        return; // Detiene el envío si está incompleta
    }

    // Alerta de éxito total
    alert("¡Gracias por tu compra, " + nombreCliente + "! Tu pago con tarjeta ha sido autorizado con éxito.");

    // Vaciamos el almacén local de la bolsa de maquillaje
    localStorage.removeItem("carrito_beauty_lab");

    // Viajamos automáticamente al index para cerrar las 7 pantallas
    window.location.href = "index.html";
}

btnRegresar.addEventListener("click", volverAlCarrito);
formulario.addEventListener("submit", procesarEnvio);