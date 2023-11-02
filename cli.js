const { mdLinks } = require('./index.js')

/* mdLinks('/ruta/a/verificar')
  .then((result) => {
    console.log('Ruta absoluta:', result.convertPath)
    console.log('Extensión del archivo:', result.extFile)
  })
  .catch((error) => {
    console.error(error)
  }) */

mdLinks('./example/markdown.md', true)
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

/* mdLinks('./README.md', true)
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  })

mdLinks('./README.md')
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
