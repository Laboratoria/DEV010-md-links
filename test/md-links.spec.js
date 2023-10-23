const { mdLinks } = require('../index.js');


describe('mdLinks', () => {
  it('should return a promise', () => {
    expect(mdLinks).toBe(typeof Promise);
  });
  it('reject when the path does not exist', () => {
    return mdLinks('noexiste.md').catch((err) => {
      expect(err).toBe('Ruta no válida');
    })
  })

});
