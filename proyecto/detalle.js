

const textoNombre = document.getElementById("detalle-nombre");
const textoDescripcion = document.getElementById("detalle-categoria");
const textoPrecio = document.getElementById("detalle-precio");

const botonVolver = document.getElementById("bton-volver");
const botonAgregar = document.getElementById("bton-agregar-detalle");


function simularCargaProducto(){
    textoNombre.innerText = "Paletade Sombras Neón";
    textoDescripcion.innerText = "Ojos";
    textoPrecio.innerText = "350";
}

function regresarAlCatalogo(){
    window.location.href = "catalogo.html";
}

function agregarBolsa(){
    alert("¡Paleta de Sombras Neón añadida a tu bolsa de compras!");
    window.location.href = "catalogo.html";
}

botonVolver.addEventListener("click", regresarAlCatalogo);
botonAgregar.addEventListener("click", agregarBolsa);

simularCargaProducto();