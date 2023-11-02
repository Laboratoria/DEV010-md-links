const { mdLinks } = require('../index.js')
const { describe, it, expect } = require('@jest/globals')

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

/* describe('textMatches', () => {
  it('Debe verificar si se extraen los enlaces y texto entre corchetes correctamente', () => {
    textMatches.mockmockResolvedValue({})
    const links = ['https://example.com', 'https://example2.com']
    const textMatchesMock = ['[Texto 1]', '[Texto 2]']
    const linkObjects = textMatches(textMatchesMock, links)

    expect(linkObjects).toEqual([
      { href: 'https://example.com', text: 'Texto 1', file: 'example.md' }
    ])
  })
}) */
