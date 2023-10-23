// Pequeñas funciones 
const path = require('path')

// OBTENER RUTA ABSOLUTA
const pathIsAbsolute = (validatePath) => {
    const convertPath = path.resolve(validatePath) //Convierte Ruta en absoluta
    const extFile = path.extname(convertPath) //Devuelve la extencion de la ruta convertida
    return { convertPath, extFile }
}


module.exports = {
    pathIsAbsolute
}

