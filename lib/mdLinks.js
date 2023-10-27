const app = require('./app')

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
}
module.exports = mdLinks;

// function mdLinks(filePath) {
// new Promise((resolve, reject) => {
//  // const isAbsolute = path.resolve(filePath);

//   if (!app.isAbsolute(filePath)) {
//     filePath = app.transformPath(filePath);
//   } 
//   app.existPath(filePath);

//   app.readFiles(filePath)
//     .then((data) => {

//       resolve(data);
//     })
//     .catch((error) => {
//       reject('No existe', error);
//     });
    
//   });
// };


// const mdLinks = (filePath) => {
//   new Promise((resolve, reject) => {
//     const absolutePath = app.transformPath(filePath);
//     console.log('Sirve?', absolutePath);

//     const pathExists = app.existPath(filePath);
//     if (!pathExists) {
//       console.log('La ruta no existe')
//       return reject('La ruta no existe');
//     } else {
//       console.log('Existe en la computadora!');
//     }
//   })
// }
// module.exports = {
//     mdLinks
// };

// const isAbsolute = path.resolve(filePath);
        
// if (!app.isAbsolute(filePath)) {
// filePath = app.transformPath(filePath);
// }    
// app.existPath(filePath);

// app.readFiles(filePath)
// .then((data) => {
//     resolve(data);
// })
// .catch((error) => {
//     reject('No existe', error);
// });