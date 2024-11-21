refreshReservations()
window.Sistema.isLogged()

/**
 * Funcion para cargar datos, se ejecuta al inciar la pagina como tambien si se modifican las reservas.
 */
function refreshReservations() {
    let div = document.querySelector('.container-background-1')
    let reservations = window.Sistema.getItemToLocalStorage('reservations')
    let dest = window.Sistema.getItemToLocalStorage('destinos')
    let error = document.querySelector('#emptyReserv')
    let userID = window.Sistema.getItemToLocalStorage('userLoggedIn').userID
    let flag = false
    div.innerHTML = ''

    if (reservations && reservations.lenght != 0) {
        error.innerHTML = ''

        reservations.forEach(element => {
            if (element.userId == userID) {
                flag = true
                error.innerHTML = ''
                let CancelButton = '<input type="button" value="Cancelar reserva" class="cancelarReserva" hidden>'
                if (element.state == 'Pendiente') CancelButton = `<input type="button" id=${element.reservID} value="Cancelar reserva" class="cancelarReserva">`

                div.innerHTML += `<div class="reservas">
                    <h2>${dest[element.destID.split('_')[2]].dest}</h2>
                    <div class="informacion-adicional container-informacion-adicional">
                        <p class="cantidadPersonas informacion-adicional">Cantidad de personas: ${element.cant}</p>
                        <p class="montoTotal informacion-adicional">Monto total reserva: ${dest[element.destID.split('_')[2]].price * +element.cant}</p>
                        <p class="metodoPago informacion-adicional">Medio de pago seleccionado: ${element.mPayment}</p>
                    </div>
                    <input type="button" value=${element.state} class="estadoReserva-${element.state.toLowerCase()}" disabled>
                    ${CancelButton}
                </div>`
            } else {
                if (flag == false) error.innerHTML = '¡Aun no hay reservas realizadas!'
            }
        });
        document.querySelectorAll('.cancelarReserva').forEach(button => {
            button.addEventListener('click', cancelReserv);
        });
    } else {
        error.innerHTML = '¡Aun no hay reservas realizadas!'
    }

}

/**
 * Funcion para cancelar las reservas en estado pendiente
 * @param {*} event evento del boton seleccionado
 */
function cancelReserv(event) {
    let button = event.target
    let id = button.getAttribute("id")
    let reserv = window.Sistema.getItemToLocalStorage('reservations')
    let index = 0;

    while (index < reserv.length) {
        let element = reserv[index];
        if (element.reservID == id) {
            reserv[index].state = 'Cancelada'
            break
        }
        index++;
    }
    localStorage.setItem("reservations", JSON.stringify(reserv))
    window.Sistema.modifyReserv(reserv)
    refreshReservations()
}

// Evento para escuchar los cambios en el storage
window.addEventListener('storage', (event) => {
    // Actualizar los destinos ante cambios
    if (event.key === 'reservations') {
        refreshReservations()
    }
});