
const textoNombre = document.getElementById("detalle-nombre");
const textoDescripcion = document.getElementById("detalle-categoria");
const textoPrecio = document.getElementById("detalle-precio");
const fotoPlaceholder = document.querySelector(".foto-detalle-placeholder");

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
    xhttp.onload = function() {
        const xmlDoc = xhttp.responseXML;
        const listaProductos = xmlDoc.getElementsByTagName("producto");
        
        let nodoProducto = listaProductos[productoId];
        
        if (nodoProducto) {
            let nombre = nodoProducto.getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
            let precio = nodoProducto.getElementsByTagName("precio")[0].childNodes[0].nodeValue;
            let categoria = nodoProducto.getElementsByTagName("categoria")[0].childNodes[0].nodeValue;
            

            let descripcionXml = nodoProducto.getElementsByTagName("descripcion")[0].childNodes[0].nodeValue;


            textoNombre.innerText = nombre;
            textoDescripcion.innerText = categoria.toUpperCase();
            textoPrecio.innerText = parseFloat(precio).toFixed(2);
            

            document.querySelector(".descripcion-detalle-texto").innerText = descripcionXml;

            productoActual.nombre = nombre;
            productoActual.precio = parseFloat(precio);

            let claseFoto = categoria.toLowerCase() + "-" + productoId;
            if (fotoPlaceholder) {
                fotoPlaceholder.className = "foto-detalle-placeholder " + claseFoto;
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
    let carritoActual = JSON.parse(localStorage.getItem("carrito_beauty_lab")) || [];

    carritoActual.push(productoActual);

    localStorage.setItem("carrito_beauty_lab", JSON.stringify(carritoActual));

    alert("¡Excelente elección! El producto " + productoActual.nombre + " ha sido añadido a tu bolsa de compras.");

    window.location.href = "catalogo.html";
}

botonVolver.addEventListener("click", regresarAlCatalogo);
botonAgregar.addEventListener("click", agregarBolsa);


cargarDetalleProducto();