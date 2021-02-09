const pedidoRouter = require('./pedido_router');
const tipoMenuRouter = require('./tipomenu_router');
const menuRouter = require('./menu_router');
const clienteRouter = require('./cliente_routers');
const comandaRouter = require('./comanda_routers');

module.exports = (app) => {

    app.use('/api/v1', pedidoRouter);
    app.use('/api/v1', tipoMenuRouter);
    app.use('/api/v1', menuRouter);
    app.use('/api/v1', clienteRouter);
    app.use('/api/v1', comandaRouter);
}