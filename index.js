const fs = require('fs');
const { isAbsolute, extractMarkdown, validateLinks } = require('./lib/app.js');

const mdLinks = (filePath, validate) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) { //Identifica si la ruta existe de manera sincrónica
      const { absolutePath, extName } = isAbsolute(filePath);

      if (['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'].includes(extName)) {
        //El archivo es de tipo markdown continua con la lectura
        fs.promises
          .readFile(absolutePath, 'utf8')
          .then((markdownFile) => {
            const links = extractMarkdown(markdownFile, absolutePath);

            if (validate) {
              validateLinks(links)
                .then((validateLinks) => resolve(validateLinks))
                .catch((error) => reject(error));
            } else {
              resolve(links); //Resuelve los links que no son válidos
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject('No es un archivo markdown');
      }
    } else {
      reject('La ruta no existe');
    }
  });
};

module.exports = mdLinks;
