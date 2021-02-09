// Modulo Terceros
const express = require('express');

//Modulos propios
const { registrarComnada, listarComanda, registrarComnadaSE, listarComandaSession } = require('../../controller/v1/comanda_controller');
const {
    clienteById
} = require('../../controller/v1/cliente_controller');
const router = express.Router();

const { loggedin } = require('../../middleware/loggedin');

// param
router.param('clienteId', clienteById);

router.post('/comanda', registrarComnada);
router.get('/comanda/:clienteId', listarComanda);

//con Session
router.post('/comandaSe/', registrarComnadaSE);
router.get('/listarcomandaSe/', listarComandaSession);


module.exports = router;