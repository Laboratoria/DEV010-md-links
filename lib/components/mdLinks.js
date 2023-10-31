const app = require('./app');

const mdLinks = (filePath) => {
    return new Promise((resolve, reject) => {
        if (app.checkPathExtension(filePath)) {
            app.existPath(filePath)
                .then(() => app.readFiles(filePath))
                .then((links) => resolve(links))
                .catch((error) => reject(error));
        } else {
            reject('File extension is not supported');
        }
    });
};
module.exports = mdLinks;
