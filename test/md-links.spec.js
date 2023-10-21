const { mdLinks } = require('../index.js')

describe('mdLinks', () => {
 
    it('Debe rechazar cuando el path no existe', () => {
        return mdLinks('/ruta/a/verificar').catch((error)=>{
            expect(error).toBe('la ruta no existe')
        })
    })
    it ('Debe ejecutar la funcion pathIsAnsolute si la ruta existe', () => {
        return mdLinks('./example/markdown.md').then((result)=>{
            expect(result).toBe('ruta existe')
        })
    })
})
