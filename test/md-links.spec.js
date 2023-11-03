const { mdLinks } = require('../index.js')

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

describe('processLink', () => {
  it('debe devolver el objeto correcto para un enlace exitoso', () => {
    axios.get = jest.fn().mockResolvedValue({ status: 200 })

    return processLink('https://example.com', 'Example', 'example.txt')
      .then((result) => {
        expect(result).toEqual({
          href: 'https://example.com',
          text: 'Example',
          file: 'example.txt',
          status: 200,
          ok: 'ok'
        })
      })
  })
})
