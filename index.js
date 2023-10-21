// vivira MD-LINKS 
const fs = require('fs') //file -system modulo que permite leer archivos
const { pathIsAbsolute } = require('./lib/app.js')


const mdLinks = (validatePath) => {
  return new Promise((resolve, reject) => { // Creo nueva promesa
    if (fs.existsSync(validatePath)) {  // (existsSync)es un modulo para verificar si existe un archivo 
      const { convertPath, extFile } = pathIsAbsolute(validatePath)
      resolve('ruta existe')
    } else {
      reject('la ruta no existe')
    }
  })
}


module.exports = {
  mdLinks

}

