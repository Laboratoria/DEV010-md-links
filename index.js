// vivira MD-LINKS 
const fs = require('fs') //file -system modulo que permite leer archivos
const { pathIsAbsolute, isMarkdown } = require('./lib/app.js')



const mdLinks = (validatePath) => {
  // console.log(validatePath);
  return new Promise((resolve, reject) => { // Creo nueva promesa
    if (fs.existsSync(validatePath)) {  // (existsSync)es un modulo para verificar si existe un archivo 
      const convertPath = pathIsAbsolute(validatePath) // Obtiene Ruta absoluta
      const isMarkdownPath = isMarkdown(validatePath) // valida si la ruta es markdown
      resolve({ convertPath, isMarkdownPath})
    } else {
      reject('la ruta no existe')
    }
  })
}


module.exports = {
  mdLinks

}

