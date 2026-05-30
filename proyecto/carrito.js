// 1. Buscamos todos los elementos de la lista por su nombre de clase

let listaItems = document.getElementsByClassName("item-carrito");

//Variable global para guardar el resultado de la suma
let sumaTotal = 0;

function calcularTotalBolsa(){

    for (const key in listaItems){
        if (Object.prototype.hasOwnProperty.call(listaItems, key)) {
            const item = listaItems[key];

            let costoTexto = item.getAttribute("data-costo");
            sumaTotal = sumaTotal + parseInt(costoTexto);
        }
    
    }
    document.getElementById("gran-total").innerText = "Total: $" + sumaTotal;
}

const btnSeguir = document.getElementById("btn-seguir-comprando");
const btnProceder = document.getElementById("btn-proceder-datos");

function regresar(){
    window.location.href = "catalogo.html";
}

function avanzarAFormulario(){
    window.location.href = "datos.html";
}

btnSeguir.addEventListener("click", regresar);
btnProceder.addEventListener("click", avanzarAFormulario);


calcularTotalBolsa();