
const tablaCuerpo = document.getElementById("items-carrito");

const btnSeguir = document.getElementById("btn-seguir-comprando");
const btnProceder = document.getElementById("btn-proceder-datos");


function regresar(){
    window.location.href = "catalogo.html";
}

function avanzarAFormulario(){
  
    let productosEnBolsa = JSON.parse(localStorage.getItem("carrito_beauty_lab")) || [];
    if (productosEnBolsa.length === 0) {
        alert("Tu bolsa está vacía. ¡Agrega cosméticos en el catálogo primero!");
    } else {
        window.location.href = "datos.html";
    }
}


function calcularTotalBolsa(){

    let productosEnBolsa = JSON.parse(localStorage.getItem("carrito_beauty_lab")) || [];
    
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
    let productosEnBolsa = JSON.parse(localStorage.getItem("carrito_beauty_lab")) || [];
    

    productosEnBolsa.splice(indice, 1);

    localStorage.setItem("carrito_beauty_lab", JSON.stringify(productosEnBolsa));
    

    calcularTotalBolsa();
};


btnSeguir.addEventListener("click", regresar);
btnProceder.addEventListener("click", avanzarAFormulario);


calcularTotalBolsa();