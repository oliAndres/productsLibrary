console.clear()
const argv = require('process').argv
const moduloProductos = require('./productos')
const comando = argv[2]
require('colors')

let respuesta;

switch (comando) {
    case "listar":
        moduloProductos.listar()
        break;
    case "agregar":
        let nombre = argv[3]
        let marca = argv[4]
        let precio = +argv[5]
        let descuento = +argv[6] || 0
        
        if([nombre,marca,precio].includes(undefined)){
            console.log("ERROR: Todos los datos son obligatorios".red)
            break
        }
        if([precio,descuento].includes(NaN)){
            console.log("ERROR: El precio o el descuento son inválidos".red)
            break
        }

        respuesta = moduloProductos.agregar(nombre, marca, precio, descuento)

        console.log(respuesta)
        
        break

    case 'filtrar':
        respuesta = moduloProductos.filtrar(argv[3])
        console.log(respuesta)
        break

    case 'editar':
        respuesta = moduloProductos.editar(+argv[3])
        console.log(respuesta)
        break

    default:
        break;
}