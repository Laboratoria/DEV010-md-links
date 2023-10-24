// vivira MD-LINKS 
const fs = require('fs') //file -system modulo que permite leer archivos
const { pathIsAbsolute, isMarkdown } = require('./lib/app.js')




const mdLinks = (validatePath) => {
  // console.log(validatePath);
  return new Promise((resolve, reject) => { // Creo nueva promesa
    if (fs.existsSync(validatePath)) {  // (existsSync)es un modulo para verificar si existe un archivo 
      const convertPath = pathIsAbsolute(validatePath) // Obtiene Ruta absoluta
      const isMarkdownPath = isMarkdown(validatePath) // valida si la ruta es markdown

      if (isMarkdownPath)
        fs.readFile(validatePath, 'utf8', (err, data) => { // leer el archivo (err, data) es una funcion que devuelve una llamada
          if (err) {
            reject(err)
          } else {
            resolve({ convertPath, isMarkdownPath, content: data })

            const urlRex = /https?:\/\/[^\s]+/g // Uctilizo expresiones regulares para identificar links
            const links = data.match(urlRex) // (match) lo uctilizo para buscar en el archivo
            console.log(links)
          }
        })
    }
  })
}



module.exports = {
  mdLinks

}

