const btnOjos = document.getElementById("btn-ojos");
const btnLabios = document.getElementById("btn-labios");
const btnRostro = document.getElementById("btn-rostro");

function filtrarOjos() {
    window.location.href = "catalogo.html?categoria=Ojos";
}

function filtrarLabios() {
    window.location.href = "catalogo.html?categoria=Labios";
}

function filtrarRostro() {
    window.location.href = "catalogo.html?categoria=Rostro";
}

btnOjos.addEventListener("click", filtrarOjos);
btnLabios.addEventListener("click", filtrarLabios);
btnRostro.addEventListener("click", filtrarRostro);