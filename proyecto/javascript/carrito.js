const tablaCuerpo = document.getElementById("items-carrito");
const btnSeguir = document.getElementById("btn-seguir-comprando");
const btnProceder = document.getElementById("btn-proceder-datos");

let productosEnBolsa = [];

function recuperarProductoDeURL() {
    const parametros = new URLSearchParams(window.location.search);
    const nombreUrl = parametros.get("nombre");
    const precioUrl = parametros.get("precio");

    if (nombreUrl && precioUrl) {
        productosEnBolsa.push({
            nombre: nombreUrl,
            precio: parseFloat(precioUrl)
        });
    } else {
        productosEnBolsa.push({
            nombre: "Máscara Volume Noir - Ojos",
            precio: 220.00
        });
    }
}

function regresar() {
    window.location.href = "catalogo.html";
}

function avanzarAFormulario() {
    if (productosEnBolsa.length === 0) {
        alert("Tu bolsa está vacía. ¡Agrega cosméticos en el catálogo primero!");
        return;
    }
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