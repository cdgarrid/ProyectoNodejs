const express = require('express');
/// Metodos 
const {
    clienteById,
    getClientes,
    guardarCliente,
    valcliente,
    logout
} = require('../../controller/v1/cliente_controller');

//Validador Campos entrada

const { validateResgist } = require('../../validator/vCliente');

const router = express.Router();

const { loggedin, isAdmin } = require('../../middleware/loggedin');


//params
router.param('clienteId', clienteById);

//routers
router.get('/cliente/:clienteId', [loggedin], getClientes);
router.post('/logincliente', valcliente);
router.post('/cliente', validateResgist, guardarCliente);
router.get('/logout', logout);

module.exports = router;