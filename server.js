//Export de modulos de terceros///
const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const fileUpload = require('express-fileupload');
const expSeesion = require('express-session');
var cors = require('cors')

console.log(`${ __dirname }`);
console.log(`--${process.env.NODE_ENV}--`);

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({
        path: `${__dirname}/.env.development`
    })
} else {
    require('dotenv').config()
}

const app = express();

app.use(cors({
    credentials: true,
    origin: true
}));

app.use(expSeesion({
    secret: 'secretRest',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    httpOnly: false
}))

app.use(bodyParse.json());
app.use(fileUpload({
    limits: { fileSize: 1 * 1024 * 1024 }
    ///abortOnLimit: true
}));



const routerV1 = require('./routers/v1/index');
routerV1(app);

//Handler que maneja el error/
app.use((error, req, res, next) => {
    console.log(error);

    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({
        result: false,
        message: message,
        data: data
    })

});

mongoose.connect(process.env.URL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("MONGO OK");
    //***Conexion SERVER***/
    app.listen(process.env.PORT, () => {
        console.log('Server OK');
    });
}).catch((err) => console.log(err));