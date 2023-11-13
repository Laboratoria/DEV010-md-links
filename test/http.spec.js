
 const axios = require( 'axios');
 const { getStatus } = require('../lib/http.js');

 jest.mock('axios');

  describe('getStatus', () => {
    it('debe devolver el estado de una URL válida', () => {
      const links = [
        {
          href: "https://es.wikipedia.org/wiki/Markdown",
          text: "Markdown",
          file: "C:\\Laboratoria\\Proyectos\\DEV010-md-links\\ReadmeExam.md",
        }
      ];
      axios.get.mockResolvedValue({
        config:{url: "https://es.wikipedia.org/wiki/Markdown"},
        status : 200,
      });
     return getStatus(links,'ReadmeExam.md').then((result) => {
        expect(result).toEqual(
          [
            {
              ref: 'https://es.wikipedia.org/wiki/Markdown',
              text: 'Markdown',
              status: 200,
              file: 'ReadmeExam.md',
              ok: 'Ok'
            }
          ]
       );
     });
   });


  it('debe devolver el estado de una URL inválida, 400', () => {
     const links = [
       {
         href: "https://es.wikipedia.mx/wiki/Markdown",
         text: "Markdown",
         file: "C:\\Laboratoria\\Proyectos\\DEV010-md-links\\ReadmeExam.md",
       }
     ];
     axios.get.mockResolvedValue({
       config:{url: "https://es.wikipedia.mx/wiki/Markdown"},
       status : 400,
     });
    return getStatus(links,'ReadmeExam.md').catch((result) => {
       expect(result).toEqual(
         [
           {
             ref: 'https://es.wikipedia.mx/wiki/Markdown',
             text: 'Markdown',
             status: 400,
             file: 'ReadmeExam.md',
             ok: 'Fail'
           }
         ]
      );
    });
  });


 it('debería manejar errores correctamente', async () => {
  const links = [
    { href: 'https://es.wikipedia.mx/wiki/Markdown', text: 'Markdown' },
  ];
  axios.get.mockRejectedValue(new Error('error'));
  const result = await getStatus(links, 'ReadmeExam.md');
  expect(result).toEqual([
    {
      ref: 'https://es.wikipedia.mx/wiki/Markdown',
      text: 'Markdown',
      status: 400,
      file: 'ReadmeExam.md',
      ok: 'Fail',
    },
  ]);
});
})




