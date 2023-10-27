const app = require('./lib/app');

function mdLinks(filePath) {
new Promise((resolve, reject) => {
 // const isAbsolute = path.resolve(filePath);

  if (!app.isAbsolute(filePath)) {
    filePath = app.transformPath(filePath);
  } 
  app.existPath(filePath);

  app.readFiles(filePath)
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
