const fs = require('fs')
const productosJSON = fs.readFileSync('./data/productos.json','utf-8')
const productos = JSON.parse(productosJSON)

const {leerJSON, escribirJSON} = require('../data');
const Producto = require('./Producto')

module.exports = {
    productos : leerJSON(),
    listar : function(productos = this.productos){
        console.log("\n************************* LISTA DE PRODUCTOS **************************\n".green)
        productos.forEach(({id, nombre, marca, precio, stock},i) => {
            console.log(
                `${id} - ${nombre} | ${marca} | $${precio}  ||   STOCK  =>  *  ${stock}  *`.blue)});
        console.log("\n***********************************************************************\n".green)
        return null
    },
    agregar : function(nombre, marca, precio, descuento){
        let productos = this.productos
        let ultimoId = productos[productos.length -1] ? productos[productos.length -1].id : 0
    
        let nuevoProducto = new Producto(ultimoId +1, nombre, marca, precio, descuento)
        

        productos.push(nuevoProducto)
        escribirJSON(productos)

        
        return `El producto ${nuevoProducto.nombre} ${nuevoProducto.marca} se registró satisfactoriamente`
    },
    filtrar : function(marca){
        
        const productosFiltrados = this.productos.filter(producto => producto.marca === marca);
        
        return productosFiltrados 
    },
    editar : function(id){

        const productosAModificar = this.productos.find(producto => producto.id === id)

        if(!productosAModificar){
            return `\n     *** NOT FOUND ***\n`.red
        }

        const {nombre, marca} = productosAModificar
        const productosModificados = this.productos.map(producto => {

            if(producto.id === id){
                producto.stock = !producto.stock
            }
            return producto
        }) 
        escribirJSON(productosModificados)

        return `El Producto: ** ${nombre} ** | ** ${marca} se Modificó Satisfactoriamente **`
        }
}