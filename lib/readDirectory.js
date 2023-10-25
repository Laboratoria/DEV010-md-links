const fsInstance = require("fs");
const pathInstance = require("path");

getFilesInDirectory = (directoryPath) => {
  //leemos el directorio y obtenemos la lista de archivos
  const files = fsInstance.readdirSync(directoryPath);
  const filesMd = [];

  files.forEach((file) => {
    const fullPath = pathInstance.join(directoryPath, file);
    if (fsInstance.statSync(fullPath).isDirectory()) {
      // Si es un subdirectorio dentro del directorio, recursivamente obtenemos archivos en ese subdirectorio
      const subDirectoryFiles = getFilesInDirectory(fullPath);
      filesMd.push(...subDirectoryFiles);
    } else if (file.endsWith(".md")) {
      // Si es un archivo con extensión .md, agrégalo a la lista
      filesMd.push(fullPath);
    }
  });

  return filesMd;
};
module.exports = {
  getFilesInDirectory,
};
