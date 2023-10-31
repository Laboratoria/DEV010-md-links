// vivira MD-LINKS 
const fs = require('fs') //file -system modulo que permite leer archivos
const { pathIsAbsolute, isMarkdown } = require('./lib/app.js')


const mdLinks = (Path) => {
  // console.log(Path);
  return new Promise((resolve, reject) => { // Creo nueva promesa
    if (fs.existsSync(Path)) {  //(existsSync)es un modulo para verificar si existe un archivo 
      const convertPath = pathIsAbsolute(Path) // Obtiene Ruta absoluta
      const isMarkdownPath = isMarkdown(Path) // valida si la ruta es markdown

      if (isMarkdownPath)
        fs.readFile(Path, 'utf8', (error, data) => { // leer el archivo (error, data) es una funcion que devuelve una llamada
          if (error) {
            reject('no se pudo leer el archivo')
          } else {
            const urlRex = /https?:\/\/[^\s]+/g // Uctilizo expresiones regulares para identificar links
            const links = data.match(urlRex) // (match) lo uctilizo para buscar en el archivo
            //console.log(links)
            if (links) {
              const file = Path
              const textRex = /\[([^\]]+)\]\([^)]+\)/g // ([^\]]+) captura texto entre corchetes seguidos de  parentesis
              const textMatches = data.match(textRex) // se verifica si hay coincidencias entre el texto entre links y lo que esta dentro del corchete
              //console.log(textMatches) 
              if (textMatches) {
                const linkObjects = links.map((link, index) => { // (map) transforma cada elemento de un arreglo y devuelve uno nuevo (index) indice cambia a medida que se itera sobre los elementos
                  const textMatch = textMatches[index].match(/\[([^\]]+)\]/) //busca y captura el texto entre corchetes 
                  const text = textMatch ? textMatch[1] : '' // (textMatch ?) forma abreviada de escribir una estructura condicional 
                  /* let text
                  if (textMatch) {
                    text = textMatch[1]
                  } else {
                    text = ''
                  } */
                  return {
                    href: link,
                    text: text,
                    file: file,
                  }  
                })
                //console.log(linkObjects)
                resolve({
                  convertPath,
                  isMarkdown: true,
                  content: data,
                  links: linkObjects,
                })
              }
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