const path = require('node:path');
const markdown = require('markdown-it')();

/**
 * Comprueba si la ruta es absoluta
 * @param {String}  
 * @returns {Boolean}
 */
const isAbsolute = (ruta) => {
    console.log('Llamando a la función isAbsolute con ruta:', ruta);
    if (path.isAbsolute(ruta)) {
       path.isAbsolute(ruta);
    }    
}

/** 
* @param {String} ruta Ejemplo:
* @returns {String} 
*/
const transformPath = (ruta) => {
    return path.resolve(ruta);
}

/** Valida si el formato del archivo es válido.
 * @param {String} ruta
 */
const existPath = (ruta) => {
    const extention = ['.markdown', '.md', '.mkd', '.mdown', '.mdtext', '.mdwn', '.mmdtxt', '.text', '.text'];

    if (!ruta) {
        rejetc('Ruta no existe');
    }
    if (!extention.includes(path.extname(ruta))) {
        rejetc('El formato del archivo no es válido');
    }
}
// extraer los links

module.exports = {
    isAbsolute,
    transformPath,
    existPath,
};



