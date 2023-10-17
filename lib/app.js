/*Crea una función que retorne una promesa con los links encontrados dentro de un archivo Markdown específico.

Esta función debe ser un módulo que puede importarse en otros scripts de Node.js
 */
const pathInstance = require('path');
const fsInstance = require('fs');

function mdLinks(path) {

    return new Promise((resolve, reject) => {
        const isRelative = pathInstance.isAbsolute(path);
        let absolutePath = path;
        if (isRelative === true) {
            absolutePath = pathInstance.resolve(path);
        }

        fsInstance.promises.stat(absolutePath)
        .then(() => {
            const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
            const fileExtension = pathInstance.extname(absolutePath);

            if (!validExtensions.includes(fileExtension)) {
                reject(new Error('El archivo no es de tipo Markdown'));
            } else {
                return fsInstance.promises.readFile(absolutePath, 'utf-8');
            }
        }).catch(() => {
            reject(new Error('El archivo no existe'));
        }).then((validContent) => {
            const links = [];
            const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
            let match;

            while ((match = regex.exec(validContent)) !== null) {
            const [, text, href] = match;
                links.push({
                    href,
                    text,
                    file: absolutePath,
                });
            }
            resolve(links);
        }).catch(() => {
            reject(new Error('El archivo no contiene links'));
        });
    });
}

module.exports = {
    mdLinks
  };