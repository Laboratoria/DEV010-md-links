// Microfunciones
const path = require('path'); //trabaja con las rutas de archivos y directorios
const { marked } = require('marked'); //popular biblioteca de Node.js que se utiliza para convertir texto con formato Markdown en HTML
// const { link } = require('fs');
//const fetch = require('node-fetch'); //función incorporada en los navegadores para realizar solicitudes HTTP

const isAbsolute = (filePath) => { //Nombre función
    const absolutePath = path.resolve(filePath);  // Guarda las rutas convertidas en absolutas
    const extName = path.extname(absolutePath); // Extrae y busca el nombre de los archivos markdown
    return { absolutePath, extName };
};

//Función para leer el contenido de los links y extraer info 
const extractMarkdown = (markdownFile, absolutePath) => {
    const renderer = new marked.Renderer(); // Configura markdown
    const returnLinks = []; // Array para guardar los links

    renderer.link = (href, title, text) => {

        returnLinks.push({ href, text, file: absolutePath, });
    };
    marked(markdownFile, { renderer }); // Llama a marked con el renderer configurado
    return returnLinks; // Devuelve los links extraídos
};

//Se encarga de realizar la validación de un solo enlace
const validateLinks = (links) => {
    //const validLinks = links.filter(link => link.href && !link.href.startsWith('#') && !link.href.startsWith('./'));

    return Promise.all(
        links.map(link => {
            if (!link.href || link.href.startsWith('#') || link.href.startsWith('./')) {
                link.status = 500;
                link.statusText = 'Fail: Es un link interno';
                return link;
            }

            return fetch(link.href)
                .then((response) => {
                    if (!response) {
                        link.status = 500;
                        link.statusText = 'Fail: fetch failed';
                    } else {
                        link.status = response.status;
                        link.statusText = response.statusText ? 'OK' : `Fail: ${response.status}`;
                    }
                    return link;
                })
                .catch((error) => {
                    link.status = 500;
                    link.statusText = 'Fail';
                    return link;
                });
        })
    )
        .then((validatedLinks) => { // Función de retorno, resumen de la validación de enlaces
            const summary = {
                Ok: validatedLinks.filter(link => link.statusText === 'OK').length,
                Fail: validatedLinks.filter(link => link.statusText.includes('Fail')).length,
            }
            return { links: validatedLinks, summary };
        });
};

//CommondJS module Export
module.exports = {
    isAbsolute,
    extractMarkdown,
    validateLinks
}