
const btnOjos = document.getElementById("btn-ojos");
const btnLabios = document.getElementById("btn-labios");
const btnRostro = document.getElementById("btn-rostro");


function filtrarOjos() {
    // Viaja al catálogo pasándole la señal "Ojos"
    window.location.href = "catalogo.html?categoria=Ojos";
}

function filtrarLabios() {
    // Viaja al catálogo pasándole la señal "Labios"
    window.location.href = "catalogo.html?categoria=Labios";
}

function filtrarRostro() {
    // Viaja al catálogo pasándole la señal "Rostro"
    window.location.href = "catalogo.html?categoria=Rostro";
}

// 3. Conectamos los escuchadores de clics 
btnOjos.addEventListener("click", filtrarOjos);
btnLabios.addEventListener("click", filtrarLabios);
btnRostro.addEventListener("click", filtrarRostro);