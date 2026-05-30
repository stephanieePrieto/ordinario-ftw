const btnGuardar = document.getElementById("btn-guardar-datos");
const btnCancelar = document.getElementById("btn-cancelar-registro");

function procesarFormulario(){
    let nombre = document.getElementById("campo-nombre").value;
    let apellido = document.getElementById("campo-correo").value;
    let direccionCliente = document.getElementById("campo-direccion").value;

    if (nombreCliente =="" || correoCliente == "" || direccionCliente == ""){
        alert("Por favor, llena todos los campos para poder continuar con tu pedido de maquille");
    } else {

        alert("¡Muchas gracias " + nombreCliente + "! Tus datos de envío han sido registrados de forma temporal.");

        window.location.href = "pago.html";
    }
}

function regresrAlCarrito(){
    window.location.href = "carrito.html";
}

btnGuardar.addEventListener("click", procesarFormulario);
btnCancelar.addEventListener("click", regresrAlCarrito);