const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelPedido = new Schema({
    direccion_pedido: {
        type: String,
        required: true
    },
    forma_pago: {
        type: String,
        required: true
    },
    fono_contacto: {
        type: String,
        required: true
    },
    fecha_pedido: {
        type: Date,
        default: true,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    },
    clienteId: {
        type: Schema.Types.ObjectId,
        ref: 'ModelClientes'
    },
    comanda: [{
        menu: {
            type: Object,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        }
    }]
});

modelPedido.methods.solicitaPedido = async function(docCliente) {

    let docClientePopul = await docCliente
        .populate('comanda.menu.menuID').execPopulate();

    let total = 0;

    let menu = docClientePopul.comanda.menu.map(itemMenu => {

        total += itemMenu.cantidad * itemMenu.menuID.valor;

        itemMenu.menuID.vendidos += itemMenu.cantidad;
        itemMenu.menuID.save();

        console.log("ITEM: " + itemMenu);
        let copy_obj = {...itemMenu.menuID.toObject() };
        delete copy_obj.vendidos;
        delete copy_obj.disponibilidad;
        delete copy_obj.imagen;

        return {
            menu: copy_obj,
            cantidad: itemMenu.cantidad
        }

    })
    this.comanda = menu;
    this.total = total;
    await docCliente.limpiarPedido();
    return this.save();
}
const model = mongoose.model('ModelPedido', modelPedido);
module.exports = model;