refreshTotalReserv()
window.Sistema.isLogged()
window.Sistema.isAdminLogged()

/**
 * Funcion para cargar datos, se ejecuta al inciar la pagina como tambien si se modifican las reservas.
 */
function refreshTotalReserv() {
    let pendientes = document.querySelector('#pendientes')
    let aprobadas = document.querySelector('#aprobadas')
    let rechazadas = document.querySelector('#rechazadas')
    let reservations = window.Sistema.getItemToLocalStorage('reservations')
    let a = 0
    let r = 0
    let p = 0

    if (reservations && reservations.lenght != 0) {
        reservations.forEach(element => {
            if (element.state == 'Pendiente') {
                p += 1
            } else if (element.state == 'Aprobada') {
                a += 1
            } else {
                r += 1
            }
        });
    }
    pendientes.innerHTML = `<b>${p}</b>`
    aprobadas.innerHTML = `<b>${a}</b>`
    rechazadas.innerHTML = `<b>${r}</b>`

}


// Evento para escuchar los cambios en el storage
window.addEventListener('storage', (event) => {
    // Actualizar los destinos ante cambios
    if (event.key === 'reservations') {
        refreshTotalReserv()
    }
});