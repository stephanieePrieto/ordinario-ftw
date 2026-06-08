const tablaCuerpo = document.getElementById("items-carrito");
const btnSeguir = document.getElementById("btn-seguir-comprando");
const btnProceder = document.getElementById("btn-proceder-datos");

let productosEnBolsa = [];

function recuperarProductoDeURL() {
    const parametros = new URLSearchParams(window.location.search);
    
    // CORRECCIÓN CLAVE: Atrapamos las llaves exactas que manda detalle.js
    const nombre1 = parametros.get("nombre1");
    const precio1 = parametros.get("precio1");
    const nombre2 = parametros.get("nombre2");
    const precio2 = parametros.get("precio2");

    // Caso A: Si los datos vienen correctamente mapeados desde el Detalle
    if (nombre1 && precio1) {
        productosEnBolsa.push({
            nombre: nombre1,
            precio: parseFloat(precio1)
        });
        
        // Si además viene el segundo producto estático para simular el paquete, lo metemos
        if (nombre2 && precio2) {
            productosEnBolsa.push({
                nombre: nombre2,
                precio: parseFloat(precio2)
            });
        }
    } 
    // Caso B: Si entran directo al carrito vacío por el menú, dejamos productos de muestra
    else {
        productosEnBolsa.push({
            nombre: "Máscara Volume Noir - Ojos",
            precio: 220.00
        });
        productosEnBolsa.push({
            nombre: "Labial Velvet Rouge - Labios",
            precio: 260.00
        });
    }
}

function regresar() {
    window.location.href = "catalogo.html";
}

// Modificamos para mandar el bloque al Login
function avanzarAFormulario() {
    if (productosEnBolsa.length === 0) {
        alert("Tu bolsa está vacía. ¡Agrega cosméticos en el catálogo primero!");
        return;
    }
    // Mandamos el primer artículo en la URL para no perder el hilo en el formulario
    let item = productosEnBolsa[0];
    alert("Para procesar tu bolsa de cosméticos, por favor inicia sesión primero.");
    window.location.href = "login.html?nombre=" + encodeURIComponent(item.nombre) + "&precio=" + item.precio;
}

function calcularTotalBolsa() {
    let HTMLInyectado = "";
    let sumaTotal = 0; 

    if (productosEnBolsa.length === 0) {
        tablaCuerpo.innerHTML = `
            <tr>
                <td colspan="3" style="text-align: center; color: #888888; padding: 40px;">
                    Tu bolsa de compras está vacía. 
                </td>
            </tr>
        `;
        document.getElementById("gran-total").innerText = "Total: $0.00";
        return;
    }

    for (let i = 0; i < productosEnBolsa.length; i++) {
        let item = productosEnBolsa[i];
        sumaTotal = sumaTotal + parseFloat(item.precio);

        HTMLInyectado += `
            <tr class="item-carrito">
                <td><strong>${item.nombre}</strong></td>
                <td>$${parseFloat(item.precio).toFixed(2)}</td>
                <td>
                    <button class="btn-eliminar-item" onclick="eliminarProducto(${i})">Eliminar</button>
                </td>
            </tr>
        `;
    }

    tablaCuerpo.innerHTML = HTMLInyectado;
    document.getElementById("gran-total").innerText = "Total: $" + sumaTotal.toFixed(2);
}

window.eliminarProducto = function(indice) {
    productosEnBolsa.splice(indice, 1);
    calcularTotalBolsa();
};

btnSeguir.addEventListener("click", regresar);
btnProceder.addEventListener("click", avanzarAFormulario);

recuperarProductoDeURL();
calcularTotalBolsa();