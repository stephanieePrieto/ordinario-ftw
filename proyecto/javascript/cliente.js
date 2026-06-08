const contenedor = document.getElementById("contenedor-tarjetas");

function cargarInventario(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        const xmlDoc = xhttp.responseXML;
        mostrarProductos(xmlDoc);
    };
    xhttp.open("GET", "../xml/inventario.xml", true);
    xhttp.send();
}

function mostrarProductos(xml){
    const parametros = new URLSearchParams(window.location.search);
    const categoriaSeleccionada = parametros.get("categoria");
    const listaProductos = xml.getElementsByTagName("producto");

    let tarjetasHTML = "";

    for(let i = 0; i < listaProductos.length; i++){
        let nombre = listaProductos[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
        let precio = listaProductos[i].getElementsByTagName("precio")[0].childNodes[0].nodeValue;
        let categoria = listaProductos[i].getElementsByTagName("categoria")[0].childNodes[0].nodeValue;
        let claseFotoUnica = categoria.toLowerCase() + "-" + i;

        if (categoriaSeleccionada === null || categoria === categoriaSeleccionada) {
            tarjetasHTML += `
                <div class="tarjeta-producto">
                    <div class="foto-producto-placeholder ${claseFotoUnica}" role="img" aria-label="Vista previa del producto: ${nombre}"></div>
                    <div class="info-producto">
                        <span class="tag-categoria">${categoria}</span>
                        <h3 class="titulo-producto">${nombre}</h3>
                        <p class="precio-producto">$${parseFloat(precio).toFixed(2)}</p>
                        <div class="botones-tarjeta">
                            <button class="btn-ver-mas" onclick="window.location.href='detalle.html?id=${i}'">Ver más</button>
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

contenedor.addEventListener("click", function(evento) {
    if (evento.target.classList.contains("btn-agregar")){
        const tarjeta = evento.target.closest(".tarjeta-producto");
        const nombreProducto = tarjeta.querySelector(".titulo-producto").innerText;
        const precioProducto = evento.target.getAttribute("data-precio");

        alert("¡Perfecto! El producto " + nombreProducto + " se ha añadido a tu bolsa.");
        

        window.location.href = "carrito.html?nombre1=" + encodeURIComponent(nombreProducto) + 
                               "&precio1=" + precioProducto +
                               "&nombre2=" + encodeURIComponent("Labial Velvet Rouge - Labios") + 
                               "&precio2=260.00";
    }
});