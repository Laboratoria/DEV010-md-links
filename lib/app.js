// NODE
let path = require("path");
let fs = require("fs");

// EDICIÓN DE COLOR
var colors = require('colors/safe');
// console.log(colors.green('hello')); // outputs green text
// console.log(colors.red.underline('i like cake and pies')); // outputs red underlined text
// console.log(colors.inverse('inverse the color')); // inverses the color
// console.log(colors.rainbow('OMG Rainbows!')); // rainbow
// console.log(colors.trap('Run the trap')); // Drops the bass


// -------------- ¿LA RUTA ES ABSOLUTA? -> CONVERTIR A ABSOLUTA

const isAbsolute = (route) => {
  let convertPath
  if (path.isAbsolute(route)) {
    console.log(colors.blue("Absolute path, no need to convert"));
  } else {
    convertPath = path.resolve(route);
    console.log(colors.green(`New absolute path: ${convertPath}`));
  }
  return convertPath;
};
isAbsolute('ReadmeExam.md')
// C:/Laboratoria/Proyectos/DEV010-md-links/lib/readmeExam.md
//

// -------------- ¿EXISTE EN EL COMPUTADOR?
const exist = (route) => {
  if (fs.existsSync(route)) {
    console.log(colors.green(`The path exist: ${route}`));
  } else {
    console.log(colors.red("The path doesn't exist"));
  }
};

exist('ReadmeExam.md')


// -------------- ¿EL ARCHIVO ES MD?

// .isFile() md etc










// -------------- LEER EL ARCHIVO

function readFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (error, content) => {
            if (error) {
                console.error("Error al leer el archivo:", error);
                reject(error);
            } else {
                resolve(content);
            }
        });
    });
}

readFile("Example/ReadmeExam.md")
    .then((content) => console.log(colors.inverse("Este es el contenido:       " + content)))
    .catch((err) => console.log("Ocurrió un error al leer el archivo:" + err));






// -------------- ¿TIENE CONTENIDO?












// -------------- ¿HAY LINKS? EXTRAERLOS

















//  module.exports = {
//   isAbsolute,
//   convertToAbsolute
//  };
