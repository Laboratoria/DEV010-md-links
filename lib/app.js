// Pequeñas funciones 
const path = require('path')

// OBTENER RUTA ABSOLUTA
const pathIsAbsolute = (validatePath) => {
    const convertPath = path.resolve(validatePath) //Convierte Ruta en absoluta
    const extFile = path.extname(convertPath) //(extname)Devuelve la extencion de la ruta convertida
    return { convertPath, extFile }
}

// VALIDA SI LA RUTA ES MARKDOWN
const isMarkdown = (validatePath) => {
    const fileMarkdown = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text']
    const extFile = path.extname(validatePath)
    return  fileMarkdown.includes(extFile)
}



module.exports = {
    pathIsAbsolute, isMarkdown
}

