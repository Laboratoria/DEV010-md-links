// NODE
let path = require("path");
let fs = require("fs");


// EDICIÓN DE COLOR
let colors = require('colors/safe');

// -------------- ¿LA RUTA ES ABSOLUTA? -> CONVERTIR A ABSOLUTA

const isAbsolute = (route) => {
  const absoluteRoute = path.isAbsolute(route)
  console.log(colors.green(absoluteRoute))
    return absoluteRoute;

};
isAbsolute('C:/Laboratoria/Proyectos/DEV010-md-links/lib/ReadmeExam.md');

const convertPath = (route) => {
  const newAbsoluteRoute = path.resolve(route);
  console.log(colors.blue(newAbsoluteRoute))
  return newAbsoluteRoute
}

convertPath('README.md')

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


// -------------- ¿EL ARCHIVO ES MD?
 const isCompExt = (route) => {
  const extensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
   const fileMKD = path.extname(route);
   console.log(colors.rainbow(fileMKD));
   return fileMKD.includes(extensions)
  }

  isCompExt('C:\Laboratoria\Proyectos\DEV010-md-links\README.mkd')
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

 readFile("C:/Laboratoria/Proyectos/DEV010-md-links/lib/readmeExam.md")
     .then((content) => console.log(("Este es el contenido:       " + content)))
     .catch((err) => console.log("Ocurrió un error al leer el archivo:" + err));


// -------------- ¿HAY LINKS? EXTRAERLOS

const extLinksMD = (route) => {
  return new Promise((resolve, reject) => {
    const links = [];
    fs.readFile(route, 'utf-8', (err, text) => {
      if (err) {
        reject('Error' + err);
        console.error(reject)
      }
      const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
      let match;
      while ((match = regex.exec(text))) {
        const [, text, href] = match;
        links.push({ href, text, file: route });

      resolve(links);
      console.log(links)
    }});
  });
};

extLinksMD('lib\ReadmeExam.md')



















  module.exports = {
   isAbsolute,
   convertPath,
   exist,
   isCompExt,
   readFile,
   extLinksMD
   };



