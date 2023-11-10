#!/usr/bin/env node

const { mdLinks } = require('./index.js')

const [,, ...args] = process.argv

const validate = args.indexOf('--validate')// (indexOf) Busca un valor en especifico
const stats = args.includes('--stats')

if (validate !== -1) { // Si --validate se encuentra en los argumentos
  args.splice(validate, 1) // Elimina --validate de los argumentos
  mdLinks(args[0], true) // Ejecuta con validación
    .then((result) => {
      const formattedLinks = result.links.map((link) => `${link.file} ${link.href} ${link.ok} ${link.status} ${link.text}`)
      console.log(formattedLinks.join('\n'))
    })
    .catch((error) => {
      console.error(error)
    })
} else if(stats){
  mdLinks(args[0], false)
  .then((result) => {
  const tolalLinks = result.links.length
  console.log(`total: ${tolalLinks}`)
  console.log(`unique: ${tolalLinks}`)
  })
/*}else if (stats,validate){
  mdLinks(args[0],false)
  .then((result) => {
  const totalLinks = result.links.length
  const totalinksFail = result.links.length 
  console.log(`total: ${totalLinks}`)
  console.log(`unique: ${totalLinks}`)
  console.log(`broken: ${totalinksFail}`)
  })*/
}else {
  mdLinks(args[0], false) // Ejecuta sin validación
    .then((result) => {
      const formattedLinks = result.links.map((link) => `${link.file}  ${link.href}  ${link.text}`)
      console.log(formattedLinks.join('\n'));
    })
    .catch((error) => {
      console.error(error)
    })
}



  /*mdLinks(args[0])
  .then((result) => {
    const formattedLinks = result.links.map((link) => `${link.file}  ${link.href}  ${link.text}`) // (map) intera sobre cada objecto
    console.log(formattedLinks.join('\n')) // (\n) indica que cada linea estara separada por un espacio
  })
  .catch((error) => {
    console.error(error);
  })


/*mdLinks(args[0], true)
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  })

/* mdLinks('/ruta/a/verificar')
  .then((result) => {
    console.log('Ruta absoluta:', result.convertPath)
    console.log('Extensión del archivo:', result.extFile)
  })
  .catch((error) => {
    console.error(error)
  }) */

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
