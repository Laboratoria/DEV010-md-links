//CommondJS require module

const fs = require('fs')
const { isAbsolute, extractMarkdown } = require('./lib/app.js')

const mdLinks = (filePath) => { // Crea función
return new Promise((resolve, reject) => {
  if(fs.existsSync(filePath)) {  //Verifica si la ruta existe
    const { absolutePath, extName } = isAbsolute(filePath);
    if (['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'].includes(extName)) { //Verifica si la extensión markdown es absoluta
    fs.promises //módulo que sirve para interactuar con el sistema de archivos
    .readFile(absolutePath, 'utf8') //Leer el archivo
    .then((markdownFile) => {
      const links = extractMarkdown(markdownFile, absolutePath);
      resolve(links);
    })
    .catch((error) => {
      reject(error);
    });
    } else {
    reject('No es un archivo markdown')
  }
  } else {
    reject('La ruta no existe'); // Sino existe la ruta, rechaza la promesa
  }
}); 
};

module.exports =
  mdLinks;
