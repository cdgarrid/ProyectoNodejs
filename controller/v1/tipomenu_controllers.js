const ModelTipoMenu = require('../../models/model_tipomenu');
const errores = require('../../utils/errors');

function errorHandler(err, next, item) {
    if (err) {

        return next(err);
    }
    if (!item) {
        const error = new Error(errores.ErrorTM500);
        error.statusCode = 500;
        return next(error);
    }
}

//Metodo que busca Tipo Menu  por ID///
const tipoMenuById = (req, res, next, id) => {
    ModelTipoMenu.findById(id)
        .exec((err, item) => {
            if (err || !item) return errorHandler(err, next, item);

            req.docTipoMenu = item;
            next();
        });

}


//Metodo que busca tipo de menu por ID///
const getIdTipoMenu = (req, res, next) => {
    res.json({
        result: true,
        data: req.docTipoMenu
    });
}


//Metodo que lista los tipo de menu///
function listarTipoMenu(req, res, next) {

    ModelTipoMenu.find().exec((err, items) => {
        if (err || !items) return errorHandler(err, next, items);
        res.json({
            result: true,
            data: items
        });
    });
}

//Metodo que guarda el tipo de menu///
function guardarMenu(req, res, next) {

    console.log(req.body);

    let data = {
        tipo_nombre: req.body.tipo_nombre,
    }


    let modelTipoMenu = new ModelTipoMenu(data);

    modelTipoMenu.save((err, item) => {

        if (err || !item) return errorHandler(err, next, item);

        res.json({
            result: true,
            data: item
        });

    });


}

//Metodo que actualiza el tipo de menu///
function actualizarTipoMenu(req, res, next) {
    ModelTipoMenu.findByIdAndUpdate(req.docTipoMenu._id, req.body, { new: true }, (err, item) => {
        if (err || !item) return errorHandler(err, next, item);

        res.json({
            result: true,
            data: item
        })
    });


}

//Metodo que borra un tipo de menu///
function borrarTipoMenu(req, res, next) {
    ModelTipoMenu.findByIdAndRemove(req.docTipoMenu._id, (err, item) => {
        if (err || !item) return errorHandler(err, next, item);
        res.json({
            result: true,
            data: item
        })

    });
}

module.exports = {
    getIdTipoMenu,
    listarTipoMenu,
    guardarMenu,
    actualizarTipoMenu,
    borrarTipoMenu,
    tipoMenuById
};