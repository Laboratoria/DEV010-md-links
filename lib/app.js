// Microfunciones
const path = require('path'); //trabaja con las rutas de archivos y directorios
const { marked } = require('marked'); // analiza texto markdrown extrae informacion de enlaces y otros contenidos


const isAbsolute = ( filePath ) => { //Nombre función
    const absolutePath = path.resolve(filePath);  // Guarda las rutas convertidas
    const extName = path.extname(absolutePath); // Extrae el nombre de las funciones convertidas
    return{ absolutePath, extName };
}

//Función para leer el contenido de los links y extraer info 
const extractMarkdown = (markdownFile, absolutePath) => {
    const renderer = new marked.Renderer(); // Configura markdown
    const returnLinks = []; // Array para guardar los links

    renderer.link = (href, title, text) => {
        returnLinks.push({ href, text, file: absolutePath });
    };
    marked(markdownFile, { renderer }); // Llama a marked con el renderer configurado
    return returnLinks; // Devuelve los links extraídos
}

//CommondJS module Export
module.exports = {
    isAbsolute,
    extractMarkdown
}