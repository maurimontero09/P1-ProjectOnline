refreshReservations()
window.Sistema.isAdminLogged()
window.Sistema.isLogged()

/**
 * Funcion para cargar datos, se ejecuta al inciar la pagina como tambien si se modifican las reservas.
 */
function refreshReservations() {
    let div = document.querySelector('#tbodyReservas')
    let reservations = window.Sistema.getItemToLocalStorage('reservations')
    let dest = window.Sistema.getItemToLocalStorage('destinos')
    let error = document.querySelector('#emptyReserv')
    div.innerHTML = ''

    if (reservations && reservations.lenght != 0) {
        error.innerHTML = ''

        reservations.forEach(element => {
            let processButton = '<td><input type="button" value="Procesar" class="btnProcesar" hidden></td>'
            if (element.state == 'Pendiente') processButton = `<td><input type="button" value="Procesar" id=${element.reservID} class="btnProcesar"></td>`

            div.innerHTML += `<tr class="open-modal">
            <td>${dest[element.destID.split('_')[2]].dest}</td>
            <td>USD ${dest[element.destID.split('_')[2]].price * +element.cant}</td>
            <td><input type="button" value=${element.state} class="estadoReserva-${element.state.toLowerCase()}" disabled></td>
            ${processButton}
          </tr>`
        });

        document.querySelectorAll('.btnProcesar').forEach(button => {
            button.addEventListener('click', verifyReserv);
        });

    } else {
        error.innerHTML = '¡Aun no hay reservas realizadas!'
    }

}

/**
 * Funcion para procesar las reservas pendientes. Hace las validaciones pertinentes para aprobarlas o rechazarlas.
 * @param {object} event evento del boton seleccionado
 */
function verifyReserv(event) {
    let usersDatabase = window.Sistema.getItemToLocalStorage('usersDatabase');
    let userLoggedIn = window.Sistema.getItemToLocalStorage('userLoggedIn');
    let button = event.target;
    let reserv = window.Sistema.getItemToLocalStorage('reservations') || [];
    let dest = window.Sistema.getItemToLocalStorage('destinos') || [];
    let index = 0;
    while (index < reserv.length) {
        if (reserv[index].reservID == button.getAttribute("id")) {
            let destIndex = reserv[index].destID.split('_')[2]
            let destination = dest[destIndex];

            // Validar si el número de personas excede la cantidad de cupos disponibles
            if (reserv[index].cant > dest[destIndex].quotas) {
                reserv[index].state = 'Rechazada';
                break;
            }

            let user = usersDatabase.find(user => user.id === reserv[index].userId);

            if (!user) {
                /* Usuario no encontrado */
                reserv[index].state = 'Rechazada';
                break;
            }

            // Lógica de pago con efectivo
            let totalPrice = reserv[index].cant * dest[destIndex].price;
            if (reserv[index].mPayment === 'efectivo') {
                if (totalPrice > user.userBudget) {
                    /* Rechazada por falta de credito */
                    reserv[index].state = 'Rechazada';
                    break;
                }
                user.userBudget -= totalPrice;
                userLoggedIn.budget = user.userBudget;
                reserv[index].state = 'Aprobada';
                user.milesAmount += Math.floor(totalPrice / 100);
            }
            // Lógica de pago con millas
            else if (reserv[index].mPayment === 'millas') {
                if (totalPrice > user.milesAmount) {
                    let priceToCover = totalPrice - user.milesAmount;
                    if (user.userBudget >= priceToCover) {
                        user.milesAmount = 0;
                        reserv[index].mPayment = 'efectivo';
                        user.userBudget -= priceToCover;
                        userLoggedIn.budget = user.userBudget;
                        user.milesAmount += Math.floor(totalPrice / 100);
                        userLoggedIn.miles = user.milesAmount;
                        reserv[index].state = 'Aprobada';
                    } else {
                        /* Rechazada por falta de efectivo */
                        reserv[index].state = 'Rechazada';
                    }
                } else {
                    user.milesAmount -= totalPrice;
                    userLoggedIn.miles = user.milesAmount;
                    /* Aprobada con millas */
                    reserv[index].state = 'Aprobada';
                }
            }
            // Método de pago inválido
            else {
                reserv[index].state = 'Rechazada';
            }

            // Si la reserva es aprobada, actualizar las cuotas del destino
            if (reserv[index].state === 'Aprobada') {
                dest[destIndex].quotas -= reserv[index].cant;
                if (dest[destIndex].quotas === 0) {
                    dest[destIndex].state = false;
                }
            }
            break;
        }
        index++;
    }

    // Guardar las reservas y datos actualizados en el localStorage
    window.Sistema.preLoadDest = reserv
    window.Sistema.pushItemToLocalStorage('reservations', reserv);
    window.Sistema.pushItemToLocalStorage('usersDatabase', usersDatabase);
    window.Sistema.pushItemToLocalStorage('destinos', dest);
    window.Sistema.pushItemToLocalStorage('userLoggedIn', userLoggedIn);

    refreshReservations();

}


// Evento para escuchar los cambios en el storage
window.addEventListener('storage', (event) => {
    // Actualizar los destinos ante cambios
    if (event.key === 'reservations') {
        refreshReservations()
    }
});