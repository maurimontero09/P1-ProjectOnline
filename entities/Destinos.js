const destinos = [];

class destino {
    constructor(IDdestino, name, price, description, image, stockAvailable) {
        this.IDdestino = IDdestino;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.stockAvailable = stockAvailable;
        this.onSale = false;
        this.isArchive = false;
    }
}