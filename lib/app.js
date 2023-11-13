let path = require("path");
let fs = require("fs");

let colors = require("colors/safe");

const isAbsolute = (route) => {
  const absoluteRoute = path.isAbsolute(route);
  // console.log(colors.blue("¿La ruta es absoluta?:",absoluteRoute))
  return absoluteRoute;
};

const convertPath = (route) => {
  const newAbsoluteRoute = path.resolve(route);
  // console.log(colors.green('¿Regresa la ruta convertida a absoluta?:', newAbsoluteRoute))
  return newAbsoluteRoute;
};

const exist = (route) => {
  if (fs.existsSync(route)) {
    // console.log(colors.bold("¿La ruta existe?:",true))
    return true;
  } else {
    // console.log(colors.green(false))
    return false;
  }
};

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
  // console.log(colors.yellow('¿El archivo es markdown o una extensión compatible?:',fileExt))
  return fileExt;
};

const extLinksMD = (route) => {
  return new Promise((resolve, reject) => {
    const links = [];
    fs.readFile(route, "utf-8", (err, text) => {
      if (err) {
       return reject(err);
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

module.exports = {
  isAbsolute,
  convertPath,
  exist,
  isCompExt,
  extLinksMD,
};
