/*Crea una función que retorne una promesa con los links encontrados dentro de un archivo Markdown específico.

Esta función debe ser un módulo que puede importarse en otros scripts de Node.js
 */
const pathInstance = require('path');
const fsInstance = require('fs');

function mdLinks(path) {
   //1. Crear promesa
    return new Promise((resolve, reject) => {
        //2. La ruta ingresada es relativa o absoluta? Transformar a absoluta
        const isRelative = pathInstance.isAbsolute(path);
        let absolutePath = path;
        if (isRelative === true) {
            absolutePath = pathInstance.resolve(path);
        }
        //3. Comprobar que la ruta existe en el sistema
        fsInstance.promises.stat(absolutePath)
        // 4.El archivo es Markdown?
        .then(() => {
            const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
            const fileExtension = pathInstance.extname(absolutePath);

            if (!validExtensions.includes(fileExtension)) {
                reject(new Error('El archivo no es de tipo Markdown'));
            } else {
                // 5. Leer el  archivo
                return fsInstance.promises.readFile(absolutePath, 'utf-8');
            }
        }).catch(() => {
            reject('Sin informacion, favor ingresar una ruta valida');
        }).then((validContent) => {
            // 6. Encontrar links
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
            if (links.length === 0) {
                // No se encontraron enlaces, por lo que rechaza la promesa
                reject(new Error('No se encontraron enlaces en el archivo'));
              } else {
            // 7.Resolver la promesa con un arreglo de objetos
            resolve(links);
              }
        }).catch(() => {
            // 8. Manejo de errores
            reject('El archivo no contiene links');
        });
    });
}

module.exports = {
    mdLinks
  };