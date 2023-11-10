#!/usr/bin/env node

const { mdLinks } = require('./index.js')

const [,, ...args] = process.argv

const validate = args.indexOf('--validate')// (indexOf) Busca un valor en especifico
const stats = args.includes('--stats')

if (stats && validate !== -1){
  mdLinks(args[0],false)
  .then((result) => {
  const totalLinks = result.links.length
  const linkUnique = []
  const totalinksFail = []
  result.links.forEach((link)=> {
    if(!linkUnique.includes(link.href)){
      linkUnique.push(link.href)
    }
  
    if ((link.status >= 200 && link.status < 400)){
      totalinksFail.push(link.href)
    }
console.log(`hollll${totalinksFail}`)
  })
  const unique = linkUnique.length
  const linkFail = totalinksFail.length


  console.log(totalLinks)
  console.log(`total: ${totalLinks}`)
  console.log(`unique: ${unique}`)
  console.log(`broken: ${linkFail}`)
  })
}
 else if(stats){
  mdLinks(args[0], false)
  .then((result) => {
  const tolalLinks = result.links.length
  console.log(`total: ${tolalLinks}`)
  console.log(`unique: ${tolalLinks}`)
  })
}else if (validate !== -1) { // Si --validate se encuentra en los argumentos
  args.splice(validate, 1) // Elimina --validate de los argumentos
  mdLinks(args[0], true) // Ejecuta con validación
    .then((result) => {
      const formattedLinks = result.links.map((link) => `${link.file} ${link.href} ${link.ok || link.fail} ${link.status} ${link.text}`)
      console.log(formattedLinks.join('\n'))
    })
    .catch((error) => {
      console.error(error)
    })
} else {
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
