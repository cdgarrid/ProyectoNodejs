// Modulo Terceros
const express = require('express');

//Modulos propios
const {
    menuById,
    guardarMenu,
    listarMenus,
    actualizarMenu,
    listarxTipoMenu,
    borrarMenu,
    menuImagen
} = require('../../controller/v1/menu_controllers');
const router = express.Router();

const { loggedin, isAdmin } = require('../../middleware/loggedin');

//params
router.param('menuId', menuById)

//Acceso solo Administrador

router.post('/menu', [loggedin, isAdmin], guardarMenu);
router.put('/menu/:menuId', [loggedin, isAdmin], actualizarMenu);
router.delete('/menu/:menuId', [loggedin, isAdmin], borrarMenu);

// Acceso Cliente
router.get('/menu', listarMenus);
router.get('/menu/tipomenu/:tipo_nemu_nombre', listarxTipoMenu);
router.get('/menu/imagen/:menuId', menuImagen);

module.exports = router;