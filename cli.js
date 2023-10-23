//const path = require('path'); // trabaja con las rutas de archivos y directorios

//const fetch = require('node-fetch'); // status y ver si están rotos o no los links

// Aquí se alojan then y catch
const mdLinks = require('./index.js');

mdLinks('example/readme.md')
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });