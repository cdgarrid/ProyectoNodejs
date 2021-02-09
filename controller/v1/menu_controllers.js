const ModelMenu = require('../../models/model_menu');
const errores = require('../../utils/errors');

function errorHandler(err, next, item, ) {

    if (err) {
        return next(err);
    }
    if (!item) {
        const error = new Error(errores.ErrorM404);
        error.statusCode = 410;
        return next(error);
    }
}

// Param que busca menu por ID
const menuById = (req, res, next, id) => {

    ModelMenu.findById(id)
        .exec((err, item) => {
            if (err || !item) return errorHandler(err, next, item);
            req.docMenu = item;
            next();

        });

}


// metodo para resgistrar Menu
const guardarMenu = (req, res, next) => {
    let data = {
        nombre_plato: req.body.nombre_plato,
        descripcion: req.body.descripcion,
        valor: req.body.valor,
        disponibilidad: req.body.disponibilidad,
        tipo_nemu_nombre: req.body.tipo_nemu_nombre
    }
    let modelMenu = new ModelMenu(data);
    modelMenu.imagen.data = req.files.imagen.data;
    modelMenu.imagen.contentType = req.files.imagen.mimetype;

    if (req.files) {

        if (req.files.imagen.size > process.env.TMAXIMAG) {
            let err = new Error(errores.ErrorM413);
            err.statusCode = 413;
            return next(err);
        }
    }

    modelMenu.save((err, item) => {
        if (err || !item) return errorHandler(err, next, item);
        item = item.toObject();
        delete item.imagen;

        res.json({
            result: true,
            data: item
        })
    });
}

// metodo para obtener todos los menu
const listarMenus = (req, res, next) => {

    ModelMenu.find({ disponibilidad: true })
        .select('-imagen')
        .exec((err, items) => {

            if (err || !items)
                return errorHandler(err, next, items);

            res.json({
                result: true,
                data: items
            })

        });
}

// metodo para actualizar un menu
const actualizarMenu = (req, res, next) => {
    ModelMenu.findByIdAndUpdate(
        req.docMenu._id,
        req.body, { new: true },
        (err, item) => {

            if (err || !item) return errorHandler(err, next, item);

            res.json({
                result: true,
                data: item
            })

        }
    )
}

// metodo para lista por tipo de menu 
const listarxTipoMenu = (req, res, next) => {
    ModelMenu.find({ tipo_nemu_nombre: req.params.tipo_nemu_nombre })
        .select('-imagen')
        .exec((err, items) => {
            if (err || !items)
                return errorHandler(err, next, items);

            res.json({
                result: true,
                data: items
            })
        })
}


// metodo para borrar un menu 
const borrarMenu = (req, res, next) => {

    req.docMenu.disponibilidad = false;
    req.docMenu.save((err, item) => {
        if (err || !item) return errorHandler(err, next, items);
        res.json({
            result: true,
            data: item
        })

    })

}
const menuImagen = (req, res) => {

    console.log(req.docMenu);
    res.set("Content-Type", req.docMenu.imagen.contentType);
    res.set("xxxxx", "xxx");

    return res.send(req.docMenu.imagen.data);

}

module.exports = { menuById, guardarMenu, listarMenus, actualizarMenu, listarxTipoMenu, borrarMenu, menuImagen }