const ModelCliente = require('../../models/model_cliente');
const ModelPedido = require('../../models/model_pedido');
const errores = require('../../utils/errors');
const { Comanda } = require('../../models/model_comanda');


const solicitarPedido = async(req, res, nxt) => {

    console.log(req.session.comanda);


    let comanda = req.session.comanda ? new Comanda(req.session.comanda) : null;

    if (!comanda) {
        return res.status(401).json({
            result: false,
            message: 'No Existe Comanda'
        })
    }

    let clienteId = req.body.clienteId;

    console.log(req.body.clienteId);

    docCliente = await ModelCliente.findById(clienteId).exec();

    if (!docCliente) {
        let err = new Error(errores.ErrorP500);
        next(err);
    }
    console.log(docCliente);


    docCliente.comanda.menu = comanda.menu;
    await docCliente.save();

    req.session.comanda = null

    console.log(docCliente);

    let data = {
        direccion_pedido: req.body.direccion_pedido,
        forma_pago: req.body.forma_pago,
        fono_contacto: req.body.fono_contacto,
        clienteId: docCliente._id,
        total: 0
    }



    let rpta = await new ModelPedido(data).solicitaPedido(docCliente);

    console.log(rpta.comanda.descripcion);

    res.json({
        result: true,
        pedido: rpta
    })

}

const listarPedido = (req, res, next) => {
    let clienteId = req.params.clienteId;
    console.log(req.params.clienteId);
    ModelPedido.find({ 'clienteId': clienteId })
        .select(' -comanda.menu.imagen ')
        .exec((err, items) => {

            if (items.length === 0) {
                return res.status(401).json({
                    result: false,
                    message: 'No Existe Pedidos'
                })
            }


            res.json({
                result: true,
                data: items
            })
        })
}

module.exports = {
    solicitarPedido,
    listarPedido
}