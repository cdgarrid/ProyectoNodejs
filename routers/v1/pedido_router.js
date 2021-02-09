const express = require('express');
const {
    listarPedido,
    solicitarPedido,
    solicitarPedidoSe

} = require('../../controller/v1/pedido_controller');
const router = express.Router();

const { loggedin } = require('../../middleware/loggedin');

//router
router.get('/pedido/listarpedido/:clienteId', [loggedin], listarPedido);
router.post('/pedido/solicitarpedido', [loggedin], solicitarPedido);

module.exports = router;