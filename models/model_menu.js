const mongoose = require('mongoose');
const ModelTipoMenu = require('./model_tipomenu');


const validator_tipomenu = async(val) => {
    let rpta = await ModelTipoMenu.exists({ tipo_nombre: val })
    return rpta;
}

let modelMenu = new mongoose.Schema({
    nombre_plato: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    disponibilidad: {
        type: Boolean,
        default: true
    },
    tipo_nemu_nombre: {
        type: String,
        required: true
    },
    vendidos: {
        type: Number,
        default: 0
    },
    imagen: {
        data: Buffer,
        contentType: String
    }
});

modelMenu.path('tipo_nemu_nombre').validate({
    validator: validator_tipomenu,
    message: 'Tipo de Menu no existe : {VALUE}'
});

const model = mongoose.model('ModelMenu', modelMenu);
module.exports = model;