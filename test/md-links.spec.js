const { isAbsolute, extractMarkdown, validateLinks } = require('../lib/app.js');

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
})

// Test para validateLink
describe('validateLink', () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock; // Asigna el mock a la variable global.fetch
  });

  test('debería resolver la promesa con los links válidos', () => {
    const links = [
      { href: 'https://google.com', text: 'Google' },
      { href: 'https://example.com', text: 'Example' },
    ];

    // Configura el mock para la primera llamada (éxito)
    fetchMock.mockResolvedValueOnce({
      status: 200,
      statusText: 'OK',
    });

    // Configura el mock para la segunda llamada (error)
    fetchMock.mockRejectedValueOnce(new Error('Fetch failed'));

    // Ejecuta la función que utiliza fetch (validateLinks en este caso)
    return expect(validateLinks(links)).resolves.toEqual({
      links: [
        { href: 'https://google.com', text: 'Google', status: 200, statusText: 'OK' },
        { href: 'https://example.com', text: 'Example', status: 500, statusText: 'Fail' },
      ],
      summary: { Fail: 1, Ok: 1 },
    });
  })

  it('should handle internal links correctly', () => {
    const internalLinks = [
      { href: '#internal1', text: 'Internal Link 1' },
      { href: './internal2', text: 'Internal Link 2' },
    ];

    return validateLinks(internalLinks, (link) => true)
      .then((result) => {
        expect(result.links).toEqual([
          { href: '#internal1', text: 'Internal Link 1', status: 500, statusText: 'Fail: Es un link interno' },
          { href: './internal2', text: 'Internal Link 2', status: 500, statusText: 'Fail: Es un link interno' },
        ]);
        expect(result.summary.Ok).toBe(0);
        expect(result.summary.Fail).toBe(2);
      });
  });
});