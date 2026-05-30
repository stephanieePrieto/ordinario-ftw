// PARTE 2
// 1. Buscamos el div vacío en el HTML usando su id
//2. AJAX es...

const contenedor = document.getElementById("catalogo");
// esto es como apuntar al elemento del HTML. JavaScript ahora sabe 
// exactamente donde trabajar.

//creamos la función principal para ir a traer los datos
function cargarInventario(){
    //3. Creamos un objeto XMLHttpRequest
    const xhttp = new XMLHttpRequest();
    // es una herramienta nativa, sirve para pedirle datos a un archivo externo sin necesidad de 
    // que la página se recargue por completo

    //Le programamos la función que se va a ejecutar cuando el estado de la petición cambie
    xhttp.onload = function(){
        //guardamos el archivo XML que nos regresó el servidor dentro de una constante
        const xmlDoc = xhttp.responseXML;

        //mandamos ese archivo a otra función para que lo lea
        mostrarProductos(xmlDoc);
    };

    //le decimos al mensajero a qué archivo ir a buscar ("GET") y donde está ("inventario.xml")
    xhttp.open("GET", "inventario.xml");
    //enviamos la petición
    xhttp.send();

    //Parte 2.2 Recibir esa caje con datos de maquillaje, abrirla y acomodar cada producto en nuestro aparador vacío (div)

    function mostrarProductos(xml){
        //Extraemos todos los elementos <producto> del archivo XML y los 
        //guardamos en una lista
        //Esto crea un arreglo con los productos para poder 1 por 1.

        const listaProductos = xml.getElementsByTagName("producto");

        //creamos una variable para guardar el código HTML que vamos a generar
        let tarjetasHTML  = "";

        // iniciamos un ciclo for clásico para revisar cada prodcto de la lista
        for(let i = 0; i < listaProductos.length; i++){
            //Sacamos el texto que está adentro de la etiqueta <nombre> del producto actual
            let nombre = listaProductos[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
            //Sacamos el texto que está adentro de la etiqueta <precio> del producto actual
            let precio = listaProductos[i].getElementsByTagName("precio")[0].childNodes[0].nodeValue;
            //Sacamos el texto que está adentro de la etiqueta <descripcion> del producto actual
            let descripcion = listaProductos[i].getElementsByTagName("categoria")[0].childNodes[0].nodeValue;


            // listaProductos[i] en la primera vuelta JS va y revisa el primer prodcuto del XML y así.
            //childNodes[0].nodeValue es para decirle que queremos el texto que está adentro de la etiqueta, no la etiqueta en sí.
            //tarjetasHTML += significa "deja lo que ya tenías y agrega eso nevo"
            tarjetasHTML += `
                <div style="border: 2px solid purple; padding: 10px; margin: 10px; display: inline-block; width: 200px;">
                    <h3>${nombre}</h3>
                    <p>Categoria: <strong>${descripcion}</strong></p>
                    <p>Precio: $${precio}</p>
                    <button>Agregar al carrito</button>
                </div>
            `;
        }

        //Le inyectamos todas las tarjetas acumuladas al div vacío que capturamos al inicio.
        contenedor.innerHTML = tarjetasHTML;
    }
}

//Mandamos a llamar la función inicial para que todo arranque automáticamente
cargarInventario();