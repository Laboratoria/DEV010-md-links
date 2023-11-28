// Se importa el módulo 'fs' para trabajar con el sistema de archivos
const fs = require('fs');

const fReadFile = (readFile) =>{
  return fs.promises.readFile(readFile, 'utf-8')
  //TODO: readFile lee el contenido del archivo de manera asincronica
};

// Exportacion
module.exports = fReadFile;
