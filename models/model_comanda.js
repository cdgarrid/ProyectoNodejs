class Comanda {


    constructor(comanda) {
        this.menu = comanda.menu || [];
        this.cantidad = comanda.cantidad || 0;
        this.total = comanda.total || 0;
    }

    add(data) {


        console.log('this.menus: ', this.menus);
        console.log('Data: ', data);
        let index = this.menu.findIndex(menu => menu.menuID === data.menuID.toString());
        console.log('index: ', index);
        let newitems = [...this.menu];

        if (index === -1) {
            newitems.push(data)
        } else {
            newitems[index].cantidad++;
            newitems[index].total = newitems[index].cantidad * data.total;
        }
        this.menu = newitems;
        this.cantidad = this.menu.reduce((cantidad, menu) => cantidad += menu.cantidad, 0);
        this.total = this.menu.reduce((total, menu) => total += menu.total, 0);


    }

    remove(data) {

        let index = this.items.findIndex(item => item.productId.toString() === data.productId.toString());

        let _cantidad = this.items[index].cantidad;
        let newitems = [...this.items];
        if (_cantidad > 1) {
            _cantidad = this.items[index].cantidad - 1;
            newitems[index].cantidad = _cantidad;
            newitems[index].total = data.total * _cantidad;
        } else {
            delete newitems[index];
        }

        this.items = newitems;
        this.unidades = this.items.reduce((unidades, item) => unidades += item.cantidad, 0);
        this.total = this.items.reduce((total, item) => total += item.total, 0);
    }


}

module.exports = { Comanda }