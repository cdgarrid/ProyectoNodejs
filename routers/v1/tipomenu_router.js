// Modulo Terceros 
const express = require('express');

//Modulos propios
const {
    guardarMenu,
    listarTipoMenu,
    getIdTipoMenu,
    actualizarTipoMenu,
    borrarTipoMenu,
    tipoMenuById
} = require('../../controller/v1/tipomenu_controllers');
const router = express.Router();

const { loggedin, isAdmin } = require('../../middleware/loggedin');

//params
router.param('tipoMenuId', tipoMenuById);

//Acceso solo Administrador
router.post('/tipomenu', [loggedin, isAdmin], guardarMenu);
router.put('/tipomenu/:tipoMenuId', [loggedin, isAdmin], actualizarTipoMenu);
router.delete('/tipomenu/:tipoMenuId', [loggedin, isAdmin], borrarTipoMenu);

// Acceso Cliente
//router.get('/tipomenu', [loggedin], listarTipoMenu);
router.get('/tipomenu', listarTipoMenu);
router.get('/tipomenu/:tipoMenuId', [loggedin], getIdTipoMenu);

module.exports = router;