// NODE
let path = require("path");
let fs = require("fs");


// EDICIÓN DE COLOR
let colors = require('colors/safe');

// -------------- ¿LA RUTA ES ABSOLUTA? -> CONVERTIR A ABSOLUTA

const isAbsolute = (route) => {
  const absoluteRoute = path.isAbsolute(route)
    return route;
};

const convertPath = (route) => {
  const newAbsoluteRoute = path.resolve(route);
  return newAbsoluteRoute
}

// -------------- ¿EXISTE EN EL COMPUTADOR?
 const exist = (route) => {
   if (fs.existsSync(route)) {
     console.log("true")
          return true
   } else {
     console.log("false")
     return false;
   }
 };

// exist('C:/Laboratoria/Proyectos/DEV010-md-links/lib/readmeExam.md')


// // -------------- ¿EL ARCHIVO ES MD?

// // .isFile() md etc


 const isCompExt = (route) => {
  const extensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
   const fileMKD = path.extname(route);
   return fileMKD.includes(extensions)
 }

// isCompExt('C:/Laboratoria/Proyectos/DEV010-md-links/lib/readmeExam.md')




// // -------------- LEER EL ARCHIVO

// function readFile(file) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(file, "utf-8", (error, content) => {
//             if (error) {
//                 console.error("Error al leer el archivo:", error);
//                 reject(error);
//             } else {
//                 resolve(content);
//             }
//         });
//     });
// }

// readFile("C:/Laboratoria/Proyectos/DEV010-md-links/lib/readmeExam.md")
//     .then((content) => console.log(("Este es el contenido:       " + content)))
//     .catch((err) => console.log("Ocurrió un error al leer el archivo:" + err));






// // -------------- ¿HAY LINKS? EXTRAERLOS

// function extractLinksFromMarkdown(filePath) {
//     return new Promise((resolve, reject) => {
//         const markdownContent = fs.readFile(filePath, 'utf8');

//         // Verifica si el archivo está vacío o sin contenido
//         if (!markdownContent || !markdownContent.trim()) {
//             console.log('El archivo está vacío o no tiene contenido.');
//             resolve([]);
//         }

//         // Expresión regular para buscar enlaces en formato Markdown
//         const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

//         const links = [];
//         let match;
//         while ((match = linkRegex.exec(markdownContent)) !== null) {
//             const text = match[1]; // Texto del enlace
//             const url = match[2];  // URL del enlace
//             links.push({ text, url });
//         }

//         resolve(links);
//     });
// }

// // Llama a la función con la ruta del archivo Markdown que deseas analizar
// const filePath = 'C:/Laboratoria/Proyectos/DEV010-md-links/lib/readmeExam.md';

// extractLinksFromMarkdown(filePath)
//     .then(links => {
//         if (links.length === 0) {
//             console.log('No se encontraron enlaces en el archivo.');
//         } else {
//             console.log('Enlaces encontrados:');
//             links.forEach((link, index) => {
//                 console.log(`${index + 1}. Texto: ${link.text}, URL: ${link.url}`);
//             });
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });














  module.exports = {
   isAbsolute,
   convertPath,
   exist,
   isCompExt
   };



console.log(path.sep)
