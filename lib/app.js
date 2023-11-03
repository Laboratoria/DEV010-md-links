// NODE
let path = require("path");
let fs = require("fs");

// EDICIÓN DE COLOR
let colors = require("colors/safe");

const isAbsolute = (route) => {
  const absoluteRoute = path.isAbsolute(route);
  //console.log(colors.blue(absoluteRoute))
  return absoluteRoute;
};

//isAbsolute('C:/Laboratoria/Proyectos/DEV010-md-links/lib/ReadmeExam.md');

const convertPath = (route) => {
  const newAbsoluteRoute = path.resolve(route);
  // console.log(colors.blue(newAbsoluteRoute))
  return newAbsoluteRoute;
};

//convertPath('README.md')

// -------------- ¿EXISTE EN EL COMPUTADOR?
const exist = (route) => {
  if (fs.existsSync(route)) {
    //console.log(colors.green(true))
    return true;
  } else {
    // console.log(colors.green(false))
    return false;
  }
};

//exist('ReadmeExam.md')

// -------------- ¿EL ARCHIVO ES MD?
const isCompExt = (route) => {
  const extensions = [
    ".md",
    ".mkd",
    ".mdwn",
    ".mdown",
    ".mdtxt",
    ".mdtext",
    ".markdown",
    ".text",
  ];
  const fileMKD = path.extname(route);
  const fileExt = extensions.includes(fileMKD);
  //console.log(colors.yellow(fileExt))
  return fileExt;
};

//isCompExt('ReadmeExam.md')

// -------------- LEER EL ARCHIVO

// function readFile(file) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, "utf-8", (error, content) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(content);
//       }
//     });
//   });
// }
// readFile("ReadmeExam.md")
//    .then((content) => console.log(colors.italic("Este es el contenido:       " + content)))
//    .catch((err) => console.log("Ocurrió un error al leer el archivo:" + err));

// -------------- ¿HAY LINKS? EXTRAERLOS

const extLinksMD = (route) => {
  return new Promise((resolve, reject) => {
    const links = [];
    fs.readFile(route, "utf-8", (err, text) => {
      if (err) {
        reject(err);
      }
      const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
      let match;
      while ((match = regex.exec(text))) {
        const [, text, href] = match;
        links.push({ href, text, file: route });
        resolve(links);
      }
    });
  });
};

//  extLinksMD('ReadmeExam.md')
//   .then((links) => {
//     console.table(links);
//   })
//   .catch((error) => {
//     console.error(colors.bgBlue('Error al leer el archivo:', error));
//   });

module.exports = {
  isAbsolute,
  convertPath,
  exist,
  isCompExt,
 // readFile,
  extLinksMD,
};
