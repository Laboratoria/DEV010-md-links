// vivira MD-LINKS 
const fs = require('fs') //file -system modulo que permite leer archivos
const { pathIsAbsolute, isMarkdown } = require('./lib/app.js')
const axios = require('axios')


const mdLinks = (validatePath,validate) => {
  // console.log(validatePath);
  return new Promise((resolve, reject) => { // Creo nueva promesa
    if (fs.existsSync(validatePath)) {  //(existsSync)es un modulo para verificar si existe un archivo 
      const convertPath = pathIsAbsolute(validatePath) // Obtiene Ruta absoluta
      const isMarkdownPath = isMarkdown(validatePath) // valida si la ruta es markdown

      if (isMarkdownPath)
        fs.readFile(validatePath, 'utf8', (error, data) => { // leer el archivo (error, data) es una funcion que devuelve una llamada
          if (error) {
            reject('no se pudo leer el archivo')
          } else {
            const urlRex = /https?:\/\/[^\s]+/g // Uctilizo expresiones regulares para identificar links
            const links = data.match(urlRex) // (match) lo uctilizo para buscar en el archivo
            //console.log(links)
            if (links) {
              resolve({
                convertPath,
                isMarkdown: true,
                content: data,
                links: links
              })
              
            } else {
              reject('No se encontraron link en el archivo')
            }
          }
        })
    } else {
      reject('la ruta no existe')
    }
  }
  )
}


module.exports = {
  mdLinks

}
