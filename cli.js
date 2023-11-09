#!/usr/bin/env node

const { mdLinks } = require('./index.js')

const [,, ...args] = process.argv
/* mdLinks('/ruta/a/verificar')
  .then((result) => {
    console.log('Ruta absoluta:', result.convertPath)
    console.log('Extensión del archivo:', result.extFile)
  })
  .catch((error) => {
    console.error(error)
  }) */
mdLinks(args[0], true)
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  })

  
/* mdLinks('./docs/Diagrama de flujo.drawio.png')
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  }) */

/*mdLinks('./README.md', true)
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  })

/*mdLinks('./example/markdown.md')
  .then((data) => {
    console.log('Este es el contenido del archivo')
  })
  .catch((error) => {
    console.error(error)
  })

mdLinks('./README.md', true)
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  })
 */
