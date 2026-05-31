// PARTE 2
// 1. Buscamos el div vacío en el HTML usando su id.
// Ojo: En tu HTML actual le pusimos id="contenedor-tarjetas", así que apuntamos a ese.
const contenedor = document.getElementById("contenedor-tarjetas");

// creamos la función principal para ir a traer los datos con AJAX
function cargarInventario(){
    // 3. Creamos un objeto XMLHttpRequest
    const xhttp = new XMLHttpRequest();
    // es una herramienta nativa, sirve para pedirle datos a un archivo externo sin necesidad de 
    // que la página se recargue por completo

    // Le programamos la función que se va a ejecutar cuando el estado de la petición cambie
    xhttp.onload = function(){
        // guardamos el archivo XML que nos regresó el servidor dentro de una constante
        const xmlDoc = xhttp.responseXML;

        // mandamos ese archivo a otra función para que lo lea
        mostrarProductos(xmlDoc);
    };

    // le decimos al mensajero a qué archivo ir a buscar ("GET") y donde está ("inventario.xml")
    xhttp.open("GET", "inventario.xml");
    
    // enviamos la petición
    xhttp.send();
}

// Parte 2.2 Recibir esa caja con datos de maquillaje, abrirla y acomodar cada producto en nuestro aparador vacío
function mostrarProductos(xml){

    const parametros = new URLSearchParams(window.location.search);
    const categoriaSeleccionada = parametros.get("categoria");
    const listaProductos = xml.getElementsByTagName("producto");

    let tarjetasHTML  = "";

    // iniciamos un ciclo for clásico para revisar cada producto de la lista
    for(let i = 0; i < listaProductos.length; i++){
        
        // Sacamos el texto que está adentro de la etiqueta <nombre> del producto actual
        let nombre = listaProductos[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
        // Sacamos el texto que está adentro de la etiqueta <precio> del producto actual
        let precio = listaProductos[i].getElementsByTagName("precio")[0].childNodes[0].nodeValue;
        // Sacamos el texto que está adentro de la etiqueta <categoria> del producto actual
        let descripcion = listaProductos[i].getElementsByTagName("categoria")[0].childNodes[0].nodeValue;

        let claseFotoUnica = descripcion.toLowerCase() + "-" + i;

        // listaProductos[i] en la primera vuelta JS va y revisa el primer producto del XML y así.
        // childNodes[0].nodeValue es para decirle que queremos el texto que está adentro de la etiqueta, no la etiqueta en sí.
        
        // --- CONDICIONAL DE FILTRADO (Pág. 3 de tus apuntes) ---
        // Si no se seleccionó ninguna categoría en la portada (es null), O si la categoría del producto coincide con la selección...
        if (categoriaSeleccionada === null || descripcion === categoriaSeleccionada) {
            
            // tarjetasHTML += significa "deja lo que ya tenías y agrega esto nuevo"
            // Metemos las clases semánticas que ya programamos en tu estilos.css para que se vea como la IA
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

    // Le inyectamos todas las tarjetas acumuladas al div vacío que capturamos al inicio.
    // Sacado de la pág. 2 y 5: Uso de .innerHTML
    contenedor.innerHTML = tarjetasHTML;
}

// Mandamos a llamar la función inicial para que todo arranque automáticamente
cargarInventario();