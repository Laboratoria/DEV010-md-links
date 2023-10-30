const mdLinks = require('../index.js');
const path = require('path');

describe('mdLinks', () => {
    it('should return a promise', () => {
        const result = mdLinks('./example/prueba.md');
        return result.catch(error => {
            expect(error.message).toBe('The path does not exist');
        });
    });

    it('should resolve with links for a valid Markdown file', () => {
        const filePath = path.resolve('./example/prueba.md');
        return mdLinks(filePath, true).then(({ links, summary }) => {
            expect(links.length).toBe(2); // Verifica la longitud del array

            expect(summary).toEqual({
                Ok: 2,
                Fail: 0,
                // { href: 'https://docs.github.com/es/issues', text: 'issues', file: '/Users/diseno/Documents/Programación/Visual Studio/DEV010-md-links/example/prueba.md' },
                // { href: 'https://nodejs.org/', text: 'Node.js', file: '/Users/diseno/Documents/Programación/Visual Studio/DEV010-md-links/example/prueba.md' }
            }
            );
        });
    });

    it('should reject with an error for a non-markdown file', () => {
        const filePath = path.resolve('./example/notmarkdown.txt');
        return mdLinks(filePath).catch(error => {
            expect(error).toBe('No es un archivo markdown');
        });
    });

    it('should resolve with an empty array for an empty markdown file', () => {
        const filePath = path.resolve('./example/empty.md');
        return mdLinks(filePath).then(links => {
            expect(links).toEqual([]);
        });
    });

    it('should reject with an error for a non-existent path', () => {
        const filePath = path.resolve('./nonexistent/file.md');
        return mdLinks(filePath).catch(error => {
            expect(error).toBe('La ruta no existe');
        });
    });
});