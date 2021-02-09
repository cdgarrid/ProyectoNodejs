var jwt = require('jsonwebtoken');

let loggedin = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, 'semillasecreta', (err, decoded) => {
        if (err) {
            err.statusCode = 401;
            next(err);
        }
        req.usuario = decoded;
        next();

    });


}

let isAdmin = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        let err = new Error('Rol no puede realizar esta operacion');
        err.statusCode = 401;
        next(err)
    }

}

module.exports = {
    loggedin,
    isAdmin

}