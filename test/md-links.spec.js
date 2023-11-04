const { mdLinks } = require('../index.js')
const { pathIsOk } = require('../lib/app.js')

describe('mdLinks', () => {
  it('Debe rechazar cuando el path no existe', () => {
    return mdLinks('/ruta/a/verificar').catch((error) => {
      expect(error).toBe('la ruta no existe') // (toBe) se uctiliza para saber si dos valores son identicos
    })
  })
  it('Debe obtener la ruta en absoluta', () => {
    return mdLinks('./example/markdown.md').then((result) => {
      expect(result.convertPath).toEqual({ convertPath: 'C:\\Users\\Asus\\Documents\\Laboratoria\\Proyecto 4\\DEV010-md-links\\example\\markdown.md', extFile: '.md' })
    })
  })
  it('Debe validar si la ruta es md', () => {
    return mdLinks('./example/markdown.md').then((result) => {
      expect(result.isMarkdown).toEqual(true)
    })
  })
})

describe('links', () => {
  it('Debe indicar cuando no encuentre link en un archivo', () => {
    return mdLinks('./example/achivo-sin-link.md').catch((error) => {
      expect(error).toBe('No se encontraron link en el archivo')
    })
  })
})

describe('error', () => {
  it('Debe indicar si existe error al leer el archivo', () => {
    return mdLinks('./example/archivo-error-al-leer.md').catch((error) => {
      expect(error).toBe('no se pudo leer el archivo')
    })
  })
})

describe('pathIsOk', () => {
  it('debe devolver el status de manera correcta segun el link', async () => {
    const respuestaOk = await pathIsOk('https://example.com')
    expect(respuestaOk).toEqual(200)
  })
})
