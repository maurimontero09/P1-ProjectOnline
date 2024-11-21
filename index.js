window.Sistema.isLogged()

let modal = document.querySelector("#modal");
let form = document.querySelector("#form");
const btnLogOut = document.querySelector("#log-out")
btnLogOut.addEventListener("click", logOut)
// Carga los destinos al iniciar la web
actualizarDestinos();

/**
 * Funcion para cargar datos, se ejecuta al inciar la pagina como tambien si se modifican los destinos.
 */
function actualizarDestinos() {
    let div = document.querySelector('#articlesPaquetes')
    div.innerHTML = ''
    let destinos = JSON.parse(localStorage.getItem('destinos'))

    Object.keys(destinos).forEach(key => {

        if (destinos[key]["state"] == true && destinos[key]["quotas"] > 0) {
            let oferta = destinos[key]["offer"] ? `<p class="oferta">Oferta</p>` : `<p class="oferta hidden">Oferta</p>`
            let vuelos = destinos[key]["flights"] ? 'Incluye vuelos ida y vuelta' : 'No incluye vuelos ida y vuelta'
            let traslado = destinos[key]["transfer"] ? 'Incluye traslados al aeropuerto' : 'No incluye traslados al aeropuerto'

            div.innerHTML += `<article>
                    <div class="paquetes-img">
                        ${oferta}
                        <img src=${destinos[key]["url"]} alt="Imagen del Caribe">
                    </div>
                    <div class="paquetes-info">
                        <h3><strong>${destinos[key]["dest"]}</strong></h3>
                        <p>${destinos[key]["price"]} <small>USD</small></p>
                        <ul>
                            <li>Duración: ${destinos[key]["duration"]}</li>
                            <li>Alojamiento: ${destinos[key]["hotel"]}</li>
                            <li>Modalidad: ${destinos[key]["modality"]}</li>
                            <li>${vuelos}</li>
                            <li>${traslado}</li>
                        </ul>
                    </div>
                    <div id="aCont">
                        <button class="open-modal" id-destino=${destinos[key]["id"]} href="#">RESERVAR</button>
                    </div>
                </article>`
        }
    })
    openModal()
}

/**
 * Funcion para validar si existe una reserva pendiente de aprobacion a ese destino, en caso de existir desactiva los inputs y el boton.
 * @param {*} idDestino ID del destino
 */
function isPending(idDestino) {
    let reserv = window.Sistema.getItemToLocalStorage('reservations')
    let cant = document.querySelector('#inputCantPasajeros')
    let mPayment = document.querySelector('#inputMedioPago')
    let userID = window.Sistema.getItemToLocalStorage('userLoggedIn').userID
    let button = document.querySelector('#send')
    let error = document.querySelector('#emptyForm')


    if (reserv && reserv.length != 0) {
        reserv.forEach(element => {
            if (element.userId == userID) {
                if (idDestino == element.destID && element.state == 'Pendiente') {
                    error.innerHTML = '¡Aun tienes una reserva pendiente de aprobación a este destino!'
                    document.querySelector('#inputCantPasajeros').disabled = true
                    document.querySelector('#inputMedioPago').disabled = true
                    button.disabled = true
                }
            }
        })
    }
}


let idDestino = 0
/**
 * Funcion para abrir el modal con el formulario de reserva
 */
function openModal() {
    let buttons = document.querySelectorAll(".open-modal");
    // Abrir el modal al hacer clic en cualquiera de los botones
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            idDestino = button.getAttribute('id-destino');

            /* Limpiar valores del formulario */
            let cant = document.querySelector('#inputCantPasajeros')
            let error = document.querySelector('#emptyForm')
            cant.value = ''
            error.innerHTML = ''

            document.querySelector('#inputCantPasajeros').disabled = false
            document.querySelector('#inputMedioPago').disabled = false
            document.querySelector('#send').disabled = false
            isPending(idDestino)

            modal.showModal();
        });
    });
}

// Cerrar el modal al enviar el formulario y crear la reserva
form.addEventListener('submit', function (event) {
    event.preventDefault();

    let cant = document.querySelector('#inputCantPasajeros').value
    let mPayment = document.querySelector('#inputMedioPago').value
    let error = document.querySelector('#emptyForm')
    let userID = window.Sistema.getItemToLocalStorage('userLoggedIn').userID
    error.innerHTML = ''

    if (cant && mPayment) {
        if (cant > 0) {
            error.innerHTML = ''
            let reservList = window.Sistema.createReservation(cant, mPayment, idDestino, userID, 'Pendiente')
            modal.close();
        } else {
            error.innerHTML = 'La cantidad de pasajeros debe ser mayor a 0'
        }
    } else {
        error.innerHTML = '¡Todos los campos deben estar completos!'
    }

});

// Cerrar el modal al hacer clic fuera de él
modal.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.close();
    }
})

// Evento para escuchar los cambios en el storage
window.addEventListener('storage', (event) => {
    // Actualizar los destinos ante cambios
    if (event.key === 'destinos') {
        actualizarDestinos()
    }
});

function logOut() {
    localStorage.setItem('userLoggedIn', JSON.stringify(""));
}

