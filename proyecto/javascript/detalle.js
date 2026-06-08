const textoNombre = document.getElementById("detalle-nombre");
const textoCategoria = document.getElementById("detalle-categoria");
const textoPrecio = document.getElementById("detalle-precio");
const textoDescripcion = document.getElementById("detalle-descripcion");
const fotoPlaceholder = document.getElementById("detalle-foto");
const botonVolver = document.getElementById("btn-volver");
const botonAgregar = document.getElementById("btn-agregar-detalle");

let productoActual = { nombre: "", precio: 0 };

function cargarDetalleProducto() {
    const parametros = new URLSearchParams(window.location.search);
    let productoId = parametros.get("id");

    if (productoId === null) {
        productoId = 0;
    }

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const xmlDoc = xhttp.responseXML;
        const listaProductos = xmlDoc.getElementsByTagName("producto");
        let nodoProducto = listaProductos[productoId];

        if (nodoProducto) {
            let nombre = nodoProducto.getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
            let precio = nodoProducto.getElementsByTagName("precio")[0].childNodes[0].nodeValue;
            let categoria = nodoProducto.getElementsByTagName("categoria")[0].childNodes[0].nodeValue;
            let descripcionXml = nodoProducto.getElementsByTagName("descripcion")[0].childNodes[0].nodeValue;

            // 1. Guardamos INMEDIATAMENTE los datos en el objeto para asegurar el carrito
            productoActual.nombre = nombre;
            productoActual.precio = parseFloat(precio);

            // 2. Pintamos los elementos del DOM usando sus IDs limpios
            if (textoNombre) textoNombre.innerText = nombre;
            if (textoCategoria) textoCategoria.innerText = categoria.toUpperCase();
            if (textoPrecio) textoPrecio.innerText = parseFloat(precio).toFixed(2);
            if (textoDescripcion) textoDescripcion.innerText = descripcionXml;

            // 3. Manejo controlado de la foto
            if (fotoPlaceholder) {
                let claseFoto = categoria.toLowerCase() + "-" + productoId;
                fotoPlaceholder.className = "foto-detalle-vista " + claseFoto;
            }
        }
    }; 

    xhttp.open("GET", "../xml/inventario.xml", true);
    xhttp.send();
}

function regresarAlCatalogo() {
    window.location.href = "catalogo.html";
}

function agregarBolsa() {
    if (!productoActual.nombre) {
        alert("Espera a que termine de cargar el producto por favor.");
        return;
    }
    
    alert("¡Excelente elección! " + productoActual.nombre + " ha sido añadido a tu bolsa de compras.");
    
    // Mandamos las variables correctas que tu carrito.js está esperando escuchar
    window.location.href = "carrito.html?nombre1=" + encodeURIComponent(productoActual.nombre) + 
                           "&precio1=" + productoActual.precio + 
                           "&nombre2=" + encodeURIComponent("Labial Velvet Rouge - Labios") + 
                           "&precio2=260.00";
}

botonVolver.addEventListener("click", regresarAlCatalogo);
botonAgregar.addEventListener("click", agregarBolsa);

cargarDetalleProducto();