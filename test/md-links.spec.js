const { mdLinks } = require('../index.js');
const { isAbsolute, extractMarkdown } = require('../lib/app.js');


describe('mdLinks', () => {
  it('should...', () => {
    console.log('FIX ME!');
  });
  it('Debería devolver una promesa', () => {
    expect(typeof mdLinks).toBe('promise');
  });
});

// Test para isAbsolute
describe('isAbsolute', () => {
  test('debería devolver un objeto con absolutePath y extName', () => {
    const result = isAbsolute('example/readme.md');
    expect(result).toHaveProperty('absolutePath');
    expect(result).toHaveProperty('extName');
  });
});

// Test para extractMarkdown
describe('extractMarkdown', () => { //Se verifica si los enlaces se extraen correctamente
  test('debería extraer los enlaces correctamente', () => {
    const markdownFile = '[Ejemplo](http://ejemplo.com)';
    const absolutePath = 'example/readme.md';
    const result = extractMarkdown(markdownFile, absolutePath);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      href: 'http://ejemplo.com',
      text: 'Ejemplo',
      file: absolutePath,
    });
  });
});
