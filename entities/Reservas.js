const reservations = []

class Reservation {
    constructor(IDreservation, IDdestino, cantidadPersonas, totalAmount, status) {
        this.IDreservation = IDreservation;
        this.IDdestino = IDdestino;
        this.cantidadPersonas = cantidadPersonas;
        this.totalAmount = totalAmount;
        this.status = status;
    }
}
