const fs = require('fs');
const path = require('node:path');
const marked = require('marked');

/**
 * Comprueba si la ruta es absoluta
 * @param {String}  
 * @returns {Boolean}
 */
const isAbsolute = (filPath) => {
    return path.isAbsolute(filPath);  
}

/** Transforma la ruta a MD
* @param {String} filPath
* @returns {String} 
*/
const transformPath = (filPath) => {
    return path.resolve(filPath);
}

/** Valida si el formato del archivo es válido.
 * @param {String} filPath
 */
const existPath = (filPath) => {
    const extention = ['.markdown', '.md', '.mkd', '.mdown', '.mdtext', '.mdwn', '.mmdtxt', '.text', '.text'];
    if (!filPath) {
        reject('Ruta no existe');
    }
    if (!extention.includes(path.extname(filPath))) {
        reject('El formato del archivo no es válido');
    }
}

const readFiles = (filPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filPath, 'utf8', (error, data) => {
            if (error) {
                reject('No se pudo leer el archivo' + error.message);
            } else {
                const links = extractLinks(data);
                resolve(links);
            }
        });
    });
};

const extractLinks = (data) => {
    const links = [];
    const tokens = marked.lexer(data);
 

    for (const toke of tokens) {
        if (tokens.type === 'link') {
            const link = {
                href: toke.href,
                text: toke.text,
                file: data,
            };
            links.push(link);
        }
    }
    return links;
}

module.exports = {
    isAbsolute,
    transformPath,
    existPath,
    readFiles,
    extractLinks,
};



// console.log('Llamando a la función isAbsolute con ruta:', ruta);
// if (path.isAbsolute(ruta)) {
//    path.isAbsolute(ruta);
// } 