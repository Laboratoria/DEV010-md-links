const { mdLinks } = require('../index.js')
const {convertPath, extFile } = ('./lib/app.js')

describe('mdLinks', () => {
 
    it('Debe rechazar cuando el path no existe', () => {
        return mdLinks('/ruta/a/verificar').catch((error)=>{
            expect(error).toBe('la ruta no existe')
        })
    })
    it ('Debe ejecutar la funcion pathIsAnsolute si la ruta existe', () => {
        return mdLinks('./example/markdown.md').then((result)=>{
            expect(result).toEqual({
                convertPath:'C:\\Users\\Asus\\Documents\\Laboratoria\\Proyecto 4\\DEV010-md-links\\example\\markdown.md',
                extFile:'.md',
            })
        })
    })
})
