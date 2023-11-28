const path = require("path");

//array con las extensiones de archivo Markdown
const extensions = [".md", ".mkd", ".mdwn", ".mdown", ".mdtext", ".markdown", ".text"];

// fun. para verifica si la extensión del archivo es de tipo Markdown
const isMdwnExtension = (filePath) => {
    //TODO: path.extname() devuelve la extencion cuando aprece un punto 
    const fileExtension = path.extname(filePath);
    // Comprueba si la extensión obtenida está incluida en el array de extensiones de Markdown
    return extensions.includes(fileExtension);
};

// Exportacion
module.exports = { isMdwnExtension };
