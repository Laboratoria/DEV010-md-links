// Aquí se alojan then y catch
const mdLinks = require('./index.js');

mdLinks('./example/readme.md', true)
  .then((links) => { // En caso de que la promesa se resuelva exitosamente, esta función se ejecutará (los enlaces encontrados y validados) se pasan como argumento links
    console.log('Enlaces encontrados y validados:');
    console.table(links); // Utiliza console.table para imprimir los enlaces encontrados
  })
  .catch((error) => { // En caso de que la promesa sea rechazada (si hay un error durante la lectura del archivo o la validación de los enlaces), esta función se ejecutará
    console.error('Error:', error);
  });

  mdLinks('./example/readme.md', false) // false: Un valor booleano que indica que no se desea realizar la validación de los enlaces
  .then((links) => {
    console.log('Enlaces encontrados:');
    console.table(links);
  })
  .catch((error) => {
    console.error('Error:', error);
  });