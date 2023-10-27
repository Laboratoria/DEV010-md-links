const fs = require('fs');
const path = require('path');
const marked = require('marked');
// const { access } = require('fs/promises');
// const jsdom = require("jsdom"); // Libreria para simular el DOM del navegador en node.js
// const { JSDOM } = jsdom;

const extensionMD = [
    '.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text',
];
/** Transforma la ruta a MD
* @param {String} filePath
* @returns {String} 
*/
const transformPath = (filePath) => {
    const isAbsolute = path.resolve(filePath);
    console.log(isAbsolute, 'hola');
    return isAbsolute;
};

/** Valida si el formato del archivo es válido.
 * @param {String} filePath
 */ 
const existPath = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (error) => {
            if (error) {
                console.log('The path/file does not exist:', error);
                reject('The path/file does not exist');
            } else {
                console.log('The path/file exist');
                resolve();
            }
        });
    });
}

const checkPathExtension = (filePath) => {
    const extension = path.extname(filePath);
    console.log(extension, 'hola2');
    const pathIsMarkdow = extensionMD.includes(extension);
    console.log(pathIsMarkdow, 'hola3');
    return pathIsMarkdow;
}
const readFiles = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error, data) => {
            if (error) {
                console.log('Error in this ..: ', error);
                reject('Could not read the file' + error);
            } else {
                const links = extractLinks(filePath, data);
                resolve(links);
            }
        });
    });
};

const extractLinks = (filePath) => {
    const links = [];
    const tokens = marked.lexer(filePath);
 

    for (const token of tokens) {
        if (token.type === 'link') {
            const link = {
                href: token.href,
                text: token.text,
                file: filePath,
            };
            links.push(link);
        }
    }
    return links;

}

module.exports = {
    transformPath,
    existPath,
    readFiles,
    checkPathExtension,
    extractLinks,
};



// console.log('Llamando a la función isAbsolute con ruta:', ruta);
// if (path.isAbsolute(ruta)) {
//    path.isAbsolute(ruta);
// } 