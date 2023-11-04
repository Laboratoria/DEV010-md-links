const app = require('../lib/components/app.js')

describe('test of app', () => {
  it('should be true if the path is absolute', () => {
    expect(app.isAbsolute('./docs')).toBe(false);
  });
  it('should transform a path from relative to absolute and return it', () => {
    const filePath = './path/relative';
    const result = app.transformPath(filePath);
    expect(result).toEqual('C:\\Users\\betzy\\Desktop\\DEV010-md-links\\path\\relative');
  });
})

// describe('mdLinks', () => {
//   it('should return a promise', () => {
//     expect(mdLinks).toBe(typeof Promise);
//   });
//   it('reject when the path does not exist', () => {
//     return mdLinks('noexiste.md').catch((err) => {
//       expect(err).toBe('Ruta no válida');
//     })
//   })

// });
