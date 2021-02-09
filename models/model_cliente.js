const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let modelCliente = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'USER_ROLE',
    },
    comanda: {
        menu: [{
            menuID: {
                type: Schema.Types.ObjectId,
                ref: 'ModelMenu'
            },
            cantidad: {
                type: Number,
            },
            total: {
                type: Number,
            }
        }]
    }
});

modelCliente.methods.limpiarPedido = function() {
    this.comanda = { menu: [] };
    return this.save();
}

modelCliente.methods.agregarComanda = function(menus) {

    let index = this.comanda.menu.findIndex(menu => {
        return menu.menuID.toString() === menus._id.toString()
    })

    let cantidad = 1;
    let newComandaMenu = [...this.comanda.menu]

    if (index >= 0) {
        cantidad = this.comanda.menu[index].cantidad + 1;
        newComandaMenu[index].cantidad = cantidad;
        newComandaMenu[index].total = cantidad * menus.valor;
    } else {
        newComandaMenu.push({
            menuID: menus._id,
            cantidad: cantidad,
            total: menus.valor
        })
    }

    let newComanda = {
        menu: newComandaMenu
    }

    this.comanda = newComanda;
    return this.save();

}
const model = mongoose.model('ModelCliente', modelCliente);
module.exports = model;