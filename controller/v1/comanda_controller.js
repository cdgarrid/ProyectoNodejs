const ModelCliente = require('../../models/model_cliente');
const { Comanda } = require('../../models/model_comanda');
const ModelMenu = require('../../models/model_menu');


function errorHandler(err, next, item) {
    if (err) {

        return next(err);
    }
    if (!item) {
        const error = new Error('Error Agregar Comanda');
        error.statusCode = 500;
        return next(error);
    }
}

const union = (a1, a2) =>

    a1.map(menu1 => ({
        ...a2.find((menu2) => {
            return (menu2._id.toString() === menu1.menuID.toString())
        }),
        ...menu1
    }));

//Metodo que guarda comanda///
const registrarComnadaSE = async(req, res, next) => {

    let comandaId = req.body.menuId;
    try {
        modelMenu = await ModelMenu.findById(comandaId).exec();

        if (!modelMenu) {
            const error = new Error('No Existen Menu');
            error.statusCode = 405;
            return next(error);
        }

        let comandasession = new Comanda(req.session.comanda ? req.session.comanda : []);

        let obj = {
            menuID: modelMenu._id.toString(),
            cantidad: 1,
            total: modelMenu.valor
        }

        console.log(`obj`, obj);
        comandasession.add(obj);
        req.session.comanda = comandasession;

        res.json({
            result: true,
            data: comandasession
        });

    } catch (error) {
        next(error);
    }
}

//Metodo listar comanda Cliente///
const listarComanda = (req, res) => {
    req.docCliente.populate('comanda.menu.menuID', (err, menu) => {
        res.json({
            result: true,
            data: menu
        })
    });

}


const listarComandaSession = async(req, res, next) => {

    try {
        let comanda = new Comanda(req.session.comanda ? req.session.comanda : [])


        if (comanda.length === 0) {
            return res.json({
                statusCode: 401,
                result: true,
                comanda: []
            });
        }
        let ids = comanda.menu.map(item => item.menuID.toString());

        let docMenu = await ModelMenu.find({ '_id': { $in: ids } })
            .select('-imagen')
            .lean()
            .exec();

        res.json({
            result: true,
            data: union(comanda.menu, docMenu),
        });
    } catch (error) {
        console.log('dfdf');
        next(error)
    }
}

//Metodo que guarda comanda///
const registrarComnada = async(req, res, next) => {
    let menuId = req.body.menuID;
    let clienteId = req.body.clienteID;

    modelMenu = await ModelMenu.findById(menuId).exec();

    if (modelMenu) {
        modelCliente = await ModelCliente.findById(clienteId).exec();

        let resp = await modelCliente.agregarComanda(modelMenu);

        res.json({
            result: true,
            cliente: modelCliente
        })

    }
}

module.exports = {
    registrarComnada,
    listarComanda,
    registrarComnadaSE,
    listarComandaSession
};