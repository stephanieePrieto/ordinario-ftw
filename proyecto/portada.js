// 1. Buscamos los 3 botones en el HTML usando su ID único
const botonOjos = document.getElementById("btn-ojos");
const botonLabios = document.getElementById("btn-labios");
const botonRostro = document.getElementById("btn-rostro");

// 2. Definimos las funciones que se van a ejecutar al hacer clic
function irALabios() {
    // window.location.href es una instrucción nativa 
    // del navegador que sirve para cambiar de página, como si dieras clic a un enlace <a>.
    window.location.href = "catalogo.html";
}

function irAOjos() {
    window.location.href = "catalogo.html";
}

function irARostro() {
    window.location.href = "catalogo.html";
}

// 3. Le asignamos el evento de clic a cada botón conectado con su respectiva función
botonLabios.addEventListener("click", irALabios);
botonOjos.addEventListener("click", irAOjos);
botonRostro.addEventListener("click", irARostro);