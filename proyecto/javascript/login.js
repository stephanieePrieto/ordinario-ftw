const formulario = document.getElementById("formulario-login");
const btnCancelar = document.getElementById("btn-cancelar-login");

function validarAcceso(event) {
    event.preventDefault();

    const usuarioInput = document.getElementById("usuario-login").value.trim();
    const passwordInput = document.getElementById("password-login").value.trim();

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const xmlDoc = xhttp.responseXML;
        const listaUsuarios = xmlDoc.getElementsByTagName("usuario");
        let accesoConcedido = false;

        for (let i = 0; i < listaUsuarios.length; i++) {
            let userXml = listaUsuarios[i].getElementsByTagName("username")[0].childNodes[0].nodeValue.trim();
            let passXml = listaUsuarios[i].getElementsByTagName("password")[0].childNodes[0].nodeValue.trim();

            if (usuarioInput === userXml && passwordInput === passXml) {
                accesoConcedido = true;
                break;
            }
        }

        if (accesoConcedido) {
            alert("¡Bienvenida de nuevo a Beauty Lab!");
            
            // Pasamos los datos del artículo de la URL original directo a la pantalla de datos
            const parametros = new URLSearchParams(window.location.search);
            const nombreUrl = parametros.get("nombre") || "Máscara Volume Noir - Ojos";
            const precioUrl = parametros.get("precio") || "220.00";
            
            window.location.href = "datos.html?nombre=" + encodeURIComponent(nombreUrl) + "&precio=" + precioUrl;
        } else {
            alert("Usuario o contraseña incorrectos. Por favor, verifica tus credenciales.");
        }
    };

    xhttp.open("GET", "../xml/usuarios.xml", true);
    xhttp.send();
}

btnCancelar.addEventListener("click", function() {
    window.location.href = "carrito.html";
});

formulario.addEventListener("submit", validarAcceso);