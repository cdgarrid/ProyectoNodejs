const Errors = {
    //Errores CLiente
    ErrorC500: "Cliente no Existe",
    ErrorC401: "Usuario o (password) no valido",
    //Errores Menu
    ErrorM413: "Imagen supera el tamaño maximo permitido",
    ErrorM404: "Menu no Existe",
    //Errores Pedido
    ErrorP500: "Cliente no Existe",
    //Errores TipoMenu
    ErrorTM500: "Tipo Menu no Existe",
    //Errores Validaciones 
    ErrorMailValido: "ingrese un email valido",
    ErrorMailRegistrado: "Correo registrado para otro cliente",
    ErrorMailFormato: "debe tener numeros y caracteres minusculas y mayusculas y un caracter @$.! % * # ? &",
    ErrorClaveLargo: "minimo 5 caracteres",
    ErrorCrearCliente: "Error Creacion Cliente"

}
module.exports = Errors;