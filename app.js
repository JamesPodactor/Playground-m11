// Nuestro objeto es calcular el subtotal (precio sin IVA) y el total de las reservas que ha hecho un cliente.
// Caso 1
// En el caso de un cliente particular:
// Habitación / día (IVA No Incluido):
// Standard: 100 €.
// Suite: 150 €.
// Cargos adicionales:
// Por cada persona adicional sumarle 40 € al precio de cada noche.
// IVA sumarle un 21% al total.
// Crear una clase que reciba la lista de reservas y calcule el subtotal y el 
// total teniendo en cuenta los anteriores requisitos


// Caso 2
// Cubrimos el caso de un tour operador, al reservar grandes volúmenes, le damos las siguientes condiciones 
// especiales:

// Todas las habitaciones tienen el mismo precio (100 €).
// Adicionalmente se le aplica un 15 % de descuento a los servicios contratados.
// Crear una clase que herede de la primera que cubra el caso del calculo de totales y subtotales para el tour 
// operador.

const reservas = [
    {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 3
    },
    {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 4
    },
    {
    tipoHabitacion: "suite",
    pax: 2,
    noches: 1
    }
];

class Booking {
    constructor() {
        this._newBooking = [];
        this._subTotal = 0;
        this._total = 0;
    }

    getRoomType(tipoHabitacion) {
        switch(tipoHabitacion) {
            case "standard":
                return 100;
            case "suite":
                return 150;
        }

        return 1;

    }
    
    extraCosts(paxExtra) {
        return (paxExtra > 1 ? --paxExtra * 40 : 0 );
    }

    calculaSubtotal() {
        this._subTotal = reservas.reduce((acc, { tipoHabitacion, noches, pax }) =>
        acc + ((this.getRoomType(tipoHabitacion) * noches) + this.extraCosts(pax)) , 0);
    }

    calculaTotal() {
        this._total = reservas.reduce((acc, { tipoHabitacion, noches, pax }) =>
        acc + (((this.getRoomType(tipoHabitacion) * noches) + this.extraCosts(pax)) * 1.21), 
        0);
     }

    get subTotal() {
        return this._subTotal;
    }

    get total() {
        return this._total;
    }


    set booking(extBooking) {
        this._newBooking = extBooking;
        this.calculaSubtotal();
        this.calculaTotal();
    }
};


class AgencyBooking extends Booking {

    calculaSubtotal() {
        this._subTotal = reservas.reduce((acc, { pax, noches } ) => 
        acc + (((100 * noches) + this.extraCosts(pax)) * 0.85), 0);
    }

    calculaTotal() {
        this._total = reservas.reduce((acc, { pax, noches }) =>
        acc + ((((100 * noches) + this.extraCosts(pax)) * 0.85)* 1.21), 0);
    }
}

const customerBooking = new Booking();
customerBooking.booking = reservas;
console.log("Subtotal: " + customerBooking.subTotal);
console.log("Total: " + customerBooking.total);

const agentBooking = new AgencyBooking();
agentBooking.booking = reservas;
console.log("Subtotal Agencia: " + agentBooking.subTotal);
console.log("Total Agencia: " + agentBooking.total);
