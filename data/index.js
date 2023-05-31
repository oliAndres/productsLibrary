const {readFileSync, writeFileSync} = require('fs')
const path = require('path')
const productos = require('../productos')

const leerJSON = () => JSON.parse(readFileSync(path.join(__dirname, 'productos.json'),'utf-8'))

const escribirJSON = (productos) => writeFileSync(path.join(__dirname, 'productos.json'), JSON.stringify(productos, null, 3), 'utf-8')

module.exports = {
    leerJSON,
    escribirJSON
}