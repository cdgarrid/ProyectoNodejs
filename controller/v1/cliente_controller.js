const ModelCliente = require('../../models/model_cliente');
const errores = require('../../utils/errors');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


function errorHandler(err, next, item) {
    if (err) {

        return next(err);
    }
    if (!item) {
        const error = new Error(errores.ErrorC500);
        error.statusCode = 500;
        return next(error);
    }
}

//Metodo que busca Cliente por ID///
const clienteById = (req, res, next, id) => {
    ModelCliente.findById(id)
        .exec((err, item) => {
            console.log(err);
            if (err || !item) return errorHandler(err, next, item);

            req.docCliente = item;
            next();
        });

}

//Metodo que busca Cliente///
const getClientes = async(req, res) => {

    res.json({
        result: true,
        data: req.docCliente
    })
}

//Metodo que ingresa un   Cliente///
const guardarCliente = (req, res, next) => {

    let salt = parseInt(process.env.SALTH)
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    let modeloCliente = new ModelCliente(req.body);

    modeloCliente.save((err, item) => {
        if (err || !item) return errorHandler(err, next, item);

        res.json({
            result: true,
            data: item
        })
    });
}


//Metodo que valida un Cliente Email/Pass ///
const valcliente = (req, res, next) => {

    let email = req.body.email;
    let password = req.body.password;

    ModelCliente.findOne({ email: email }, (err, item) => {
        if (err || !item)
            return errorHandler(err, next, item)
        if (!bcrypt.compareSync(password, item.password)) {
            return res.status(401).json({
                result: true,
                message: errores.ErrorC401
            });
        }

        let payload = {
            usuarioId: item._id,
            role: item.role
        }

        let token = jwt.sign(payload, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });


        let user = item.toObject();
        delete user.password;

        res.json({
            result: true,
            data: {
                clienteId: item._id,
                role: item.role,
                token: token
            }
        });

    })


}

const logout = (req, res) => {
    if (req.session) {
        req.session.destroy(item => {
            res.json({
                result: true
            })
        })
    }
}


module.exports = {
    getClientes,
    clienteById,
    guardarCliente,
    valcliente,
    logout
};