const { mdlinks } = require("..")

describe ('mdlinks', ()=>{

  it('Deberia retornar una promesa', () => {
    expect(typeof mdlinks).toBe(typeof Promise);
  });
})
