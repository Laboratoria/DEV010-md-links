const fs = require('fs');
const path = require('path');
const marked = require('marked');
// const { access } = require('fs/promises');
// const jsdom = require("jsdom"); // Libreria para simular el DOM del navegador en node.js
// const { JSDOM } = jsdom;

const extensionMD = [
    '.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text',
];
/** Ruta absoluta
* @param {String} filePath
* @returns {String} 
*/

const isAbsolute = (filePath) => path.isAbsolute(filePath);

/** Transforma la ruta a MD
* @param {String} filePath
* @returns {String} 
*/
const transformPath = (filePath) => {
    return path.resolve(filePath);
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
                resolve('The path/file exist');
            }
        });
    });
}

const checkPathExtension = (filePath) => {
    const extension = path.extname(filePath);
    const pathIsMarkdow = extensionMD.includes(extension);
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
    // isAbsolute,
    // transformPath,
    existPath,
    readFiles,
    checkPathExtension,
    // extractLinks,
};
