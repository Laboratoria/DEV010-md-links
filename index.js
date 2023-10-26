const app = require('./lib/app');
const path = require('path');

function mdLinks(filePath) {
new Promise((resolve, reject) => {
  const isAbsolute = path.resolve(filePath);

  if (!isAbsolute) {
  filePath = path.transformPath(filePath);
  } 
  path.existPath(filePath);

  path.readFiles(filePath)
    .then((data) => {

      resolve(data);
    })
    .catch((error) => {
      reject('No existe', error);
    });
    
  });
};


module.exports = {
    mdLinks
};
