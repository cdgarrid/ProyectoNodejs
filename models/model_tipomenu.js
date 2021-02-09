const mongoose = require('mongoose');

let modelTipoMenu = new mongoose.Schema({
    tipo_nombre: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

const model = mongoose.model('ModelTipoMenu', modelTipoMenu);
module.exports = model;