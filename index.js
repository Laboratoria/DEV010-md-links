const fs = require('fs');

const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
  // Identificar si la ruta existe
  if (fs.existsSync(ruta)){
// revisar si la ruta es absoluta
// probar si la ruta es absoluta 
// si es un directorio filtrar los archivos md.
  } else {
    reject('Ruta no válida');
  }
  });
};

module.exports = {
    mdLinks
};
