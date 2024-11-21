const modal = document.querySelector("#modal");
const form = document.querySelector("#form");
window.Sistema.isAdminLogged()
window.Sistema.isLogged()

let preLoadDest = window.Sistema

window.addEventListener('DOMContentLoaded', addDest);
/**
 * Funcion para cargar datos, se ejecuta al inciar la pagina como tambien si se modifican los destinos.
 */
function addDest() {
    preLoadDest.pushItemToLocalStorage('destinos', preLoadDest.preLoadDest)
    let destinos = preLoadDest.getItemToLocalStorage('destinos')

    createDestTable('#tablaDestinos tbody', destinos)

    addValuesForm('tr.open-modal', destinos)
}

/**
 * Funcion para crear la tabla de con los destinos cargados
 * @param {string} id elemento donde se creara la tabla
 * @param {object} destinos objeto con los destinos
 */
function createDestTable(id, destinos) {
    let tabla = document.querySelector(id);
    tabla.innerHTML = ''
    // Iterar sobre las key del objeto destinos
    Object.keys(destinos).forEach(key => {
        let nuevaFila = document.createElement("tr");
        nuevaFila.classList.add("open-modal");

        let oferta = destinos[key]['offer'] ? 'SI' : 'NO';
        let estado = destinos[key]['state'] ? 'Activo' : 'Inactivo';

        nuevaFila.innerHTML = `
            <td>${destinos[key]['id']}</td>
            <td>${destinos[key]['dest']}</td>
            <td>${destinos[key]['price']}</td>
            <td>${oferta}</td>
            <td id="estado">${estado}</td>
        `;

        tabla.appendChild(nuevaFila);
    });
}

let nuevoDestino = false
addValuesForm('.open-modal-add')

/**
 * Funcion para agregar valores a formulario de modificar destinos
 * @param {string} id al cual se le asignara el evento click
 * @param {object} destinos objeto con la lista de destinos
 */
function addValuesForm(id, destinos) {
    const rows = document.querySelectorAll(id);

    rows.forEach(row => {
        row.addEventListener('click', function () {
            let id = ''
            if (destinos) {
                id = this.cells[0].textContent
                id = id.split('_')[2]
            } else {
                nuevoDestino = true
            }

            document.getElementById("inputDestino").value = destinos ? destinos[+id]['dest'] : "";
            document.getElementById("inputPrecio").value = destinos ? destinos[+id]['price'] : "";
            document.getElementById("inputOferta").value = destinos ? (destinos[+id]['offer'] ? 'Si' : 'No') : "";
            document.getElementById("inputFoto").value = destinos ? destinos[+id]['url'] : "";
            document.getElementById("inputDuracion").value = destinos ? destinos[+id]['duration'] : "";
            document.getElementById("inputAlojamiento").value = destinos ? destinos[+id]['hotel'] : "";
            document.getElementById("inputModalidad").value = destinos ? destinos[+id]['modality'] : "";
            document.getElementById("inputVuelos").value = destinos ? (destinos[+id]['flights'] ? 'Si' : 'No') : "";
            document.getElementById("inputTraslado").value = destinos ? (destinos[+id]['transfer'] ? 'Si' : 'No') : "";
            document.getElementById("inputCupos").value = destinos ? destinos[+id]['quotas'] : "";
            document.getElementById("inputID").value = destinos ? destinos[+id]['id'] : `DEST_ID_${Object.keys(preLoadDest.preLoadDest).length + 1}`;

            if (destinos) {
                document.getElementById("inputEstado").disabled = false
                document.getElementById("inputEstado").value = destinos[+id]['state'] ? 'Activo' : 'Inactivo'
            } else {
                document.getElementById("inputEstado").value = 'Activo'
                document.getElementById("inputEstado").disabled = true
            }
            modal.showModal();
        });
    });
}

// Cerrar el modal al enviar el formulario
form.addEventListener('submit', function () {
    modal.close();
});

// Cerrar el modal al hacer clic fuera de él
modal.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.close();
    }
});

/**
 * Funcion para validar si los datos ingresados estan vacios.
 * @param {Array} items Array con los valores a validar.
 */
function isEmpty(items) {
    let flag = false
    items.forEach(elements => {
        if (elements.length == 0) {
            flag = true
        }
    })
    return flag
}

/** 
 * Al enviar el formulario, se agrega el nuevo destino y/o modifica el destino seleccionado. 
*/ 
let buttonSendMod = document.querySelector('#send')
buttonSendMod.addEventListener('click', function (event) {
    let id = document.getElementById("inputID").value
    id = id.split('_')[2]
    let error = document.querySelector('#errorEmpty')
    error.innerHTML = ''

    let empty = isEmpty([
        document.getElementById("inputDestino").value,
        document.getElementById("inputPrecio").value,
        document.getElementById("inputOferta").value,
        document.getElementById("inputEstado").value,
        document.getElementById("inputFoto").value,
        document.getElementById("inputDuracion").value,
        document.getElementById("inputAlojamiento").value,
        document.getElementById("inputModalidad").value,
        document.getElementById("inputVuelos").value,
        document.getElementById("inputTraslado").value,
        document.getElementById("inputCupos").value]
    )
    if (empty == false) {
        error.innerHTML = ''
        if (!nuevoDestino) {
            preLoadDest.preLoadDest[+id]['dest'] = document.getElementById("inputDestino").value
            preLoadDest.preLoadDest[+id]['price'] = document.getElementById("inputPrecio").value
            preLoadDest.preLoadDest[+id]['offer'] = document.getElementById("inputOferta").value == 'Si' ? true : false
            preLoadDest.preLoadDest[+id]['state'] = document.getElementById("inputEstado").value == 'Activo' ? true : false
            preLoadDest.preLoadDest[+id]['url'] = document.getElementById("inputFoto").value
            preLoadDest.preLoadDest[+id]['duration'] = document.getElementById("inputDuracion").value
            preLoadDest.preLoadDest[+id]['hotel'] = document.getElementById("inputAlojamiento").value
            preLoadDest.preLoadDest[+id]['modality'] = document.getElementById("inputModalidad").value
            preLoadDest.preLoadDest[+id]['flights'] = document.getElementById("inputVuelos").value == 'Si' ? true : false
            preLoadDest.preLoadDest[+id]['transfer'] = document.getElementById("inputTraslado").value == 'Si' ? true : false
            preLoadDest.preLoadDest[+id]['quotas'] = document.getElementById("inputCupos").value
        } else {
            if (+document.getElementById("inputCupos").value > 0) {
                error.innerHTML = ''
                preLoadDest.preLoadDest[id] = new Dest(
                    document.getElementById("inputDestino").value,
                    document.getElementById("inputPrecio").value,
                    document.getElementById("inputOferta").value == 'Si' ? true : false,
                    document.getElementById("inputEstado").value == 'Activo' ? true : false,
                    document.getElementById("inputFoto").value,
                    document.getElementById("inputDuracion").value,
                    document.getElementById("inputAlojamiento").value,
                    document.getElementById("inputModalidad").value,
                    document.getElementById("inputVuelos").value == 'Si' ? true : false,
                    document.getElementById("inputTraslado").value == 'Si' ? true : false,
                    document.getElementById("inputCupos").value,
                    `DEST_ID_${id}`)

                nuevoDestino = false
            } else {
                error.innerHTML = 'Deben existir cupos disponibles en los nuevos destinos'
                return;
            }
        }
        addDest()
        modal.close()
    } else {
        error.innerHTML = '¡Todos los campos deben estar completos!'
    }
})
