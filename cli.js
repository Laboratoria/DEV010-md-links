//Comprobar
const { mdLinks } = require('./index.js')

mdLinks('/ruta/a/verificar')
    .then(result => {
        console.log('Ruta absoluta:', result.convertPath)
        console.log('Extensión del archivo:', result.extFile)
    })
    .catch(error => {
        console.error(error);
    })

mdLinks('./example/markdown.md') 
    .then(result => {
        console.log('Ruta absoluta:', result.convertPath)
        console.log('Extensión del archivo:', result.extFile)
    })
    .catch(error => {
        console.error(error);
    })   
