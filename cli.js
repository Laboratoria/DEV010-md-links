const { mdLinks } = require('./index.js');

mdLinks('/noexiste/').then(() => {})
.catch((err) => { 
    console.log(err)
});
// then y catch 
// va a leer los argumentos de líneas de comando y pasarlo a mdLink