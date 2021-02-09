const { body, validationResult } = require('express-validator');
const { Promise } = require('mongoose');
const ModelCliente = require('../models/model_cliente');
const errores = require('../utils/errors');


const cRegistrar = [
    body("email")
    .isEmail()
    .withMessage(errores.ErrorMailValido)

    .custom((value) => {
        return ModelCliente.findOne({ email: value }).then(userDoc => {
            console.log(userDoc);
            if (userDoc) {
                return Promise.reject(errores.ErrorMailRegistrado)
            }
        });
    })
    .normalizeEmail(),

    body("nombre").trim()
    .not()
    .isEmpty(),
    body("password").trim()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])/)
    .withMessage(errores.ErrorMailFormato)
    .isLength({ min: 5 })
    .withMessage(errores.ErrorClaveLargo)

];

const vSingup = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        const error = new Error(errores.ErrorCrearCliente);
        error.statusCode = 400;
        error.data = errors.array()
        return next(error);
    }

    next();
}

const validateResgist = [cRegistrar, vSingup];

module.exports = {
    validateResgist
}