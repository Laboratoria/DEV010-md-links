const app = require('./lib/app');

function mdLinks(ruta) {
new Promise((resolve, reject) => {
  const isAbsolute = app.isAbsolute(ruta);
  if (!isAbsolute) {
    app.isAbsolute(ruta);
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
