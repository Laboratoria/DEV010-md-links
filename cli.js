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
        console.log(result)
    })
    .catch(error => {
        console.error(error);
    })

mdLinks('./docs/Diagrama de flujo.drawio.png') 
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.error(error)
    })    

mdLinks('./example/markdown.md') 
.then(data => {
    console.log('Este es el contenido del archivo')
})
.catch(error => {
    console.error(error)
})    

    
 