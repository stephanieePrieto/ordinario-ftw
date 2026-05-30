const btnEnviar = document.getElementById("btn-enviar-reporte");
const btnInicio = document.getElementById("btn-inicio");
const contenedorHistorial = document.getElementById("historial-tickets");

let acumuladorTickets = "";

function registrarReporte(){
    let nombre = document.getElementById("soporte-nombre").value;
    let pedido = document.getElementById("soporte-pedido").value;
    let mensaje = document.getElementById("soporte-mensaje").value;

    if(nombre === "" || pedido === "" || mensaje === ""){
        alert("Por favor, llena todos los campos del reporte antes de enviarlo.");
        return;
    }

    let nuevoTicketHTML = `
    <div style="background-color: #fff0f5; border: 1px solid purple; padding: 10px; margin-bottom: 10px;">
        <h4>Pedido: ${pedido}</h4>
        <p>${mensaje}</p>
        <p>Status: <strong style="color: orange;">En Revisión</strong></p>
    </div>
    `;

    if (acumuladorTickets == ""){
        contenedorHistorial.innerHTML = nuevoTicketHTML;
    }

    acumuladorTickets = acumuladorTickets + nuevoTicketHTML;

    contenedorHistorial.innerHTML = acumuladorTickets;

    document.getElementById("soporte-nombre").value = "";
    document.getElementById("soporte-pedido").value = "";
    document.getElementById("soporte-mensaje").value = "";

    alert("¡Tu reporte ha sido enviado al equipo de soporte!");
}

function irAlInicio(){
    window.location.href = "index.html";
}

btnEnviar.addEventListener("click", registrarReporte);
btnInicio.addEventListener("click", irAlInicio);