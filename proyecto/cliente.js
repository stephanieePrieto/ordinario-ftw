const contenedor = document.getElementById("contenedor-tarjetas");

function cargarInventario(){
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function(){
        const xmlDoc = xhttp.responseXML;
        mostrarProductos(xmlDoc);
    };

    xhttp.open("GET", "inventario.xml");
    xhttp.send();
}

function mostrarProductos(xml){
    const parametros = new URLSearchParams(window.location.search);
    const categoriaSeleccionada = parametros.get("categoria");
    const listaProductos = xml.getElementsByTagName("producto");

    let tarjetasHTML  = "";

    for(let i = 0; i < listaProductos.length; i++){
        let nombre = listaProductos[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
        let precio = listaProductos[i].getElementsByTagName("precio")[0].childNodes[0].nodeValue;
        let descripcion = listaProductos[i].getElementsByTagName("categoria")[0].childNodes[0].nodeValue;

        let claseFotoUnica = descripcion.toLowerCase() + "-" + i;

        if (categoriaSeleccionada === null || descripcion === categoriaSeleccionada) {
            tarjetasHTML += `
                <div class="tarjeta-producto">
                    <div class="foto-producto-placeholder ${claseFotoUnica}"></div>
                    
                    <div class="info-producto">
                        <span class="tag-categoria">${descripcion}</span>
                        <h3 class="titulo-producto">${nombre}</h3>
                        <p class="precio-producto">$${precio}</p>
                        
                        <div class="botones-tarjeta">
                            <button class="btn-ver-mas" onclick="window.location.href='detalle.html'">Ver más</button>
                            <button class="btn-agregar" data-precio="${precio}">Agregar</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    contenedor.innerHTML = tarjetasHTML;
}

cargarInventario();

// Bolsa de compras interactiva
contenedor.addEventListener("click", function(evento) {
    if (evento.target.classList.contains("btn-agregar")){
        const tarjeta = evento.target.closest(".tarjeta-producto");

        const nombreProducto = tarjeta.querySelector(".titulo-producto").innerText;
        const precioProducto = parseFloat(evento.target.getAttribute("data-precio"));

        const productosSeleccionado = {
            nombre: nombreProducto,
            precio: precioProducto
        };

      
        let carritoActual = JSON.parse(localStorage.getItem("carrito_beauty_lab")) || [];

        carritoActual.push(productosSeleccionado);
        localStorage.setItem("carrito_beauty_lab", JSON.stringify(carritoActual));


        alert("¡Perfecto! El producto " + nombreProducto + " se ha añadido a tu bolsa.");
    }
});