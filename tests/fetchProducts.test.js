require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Se realmente é uma função', () => {
    const expected = 'function';
    expect(typeof fetchProducts).toBe(expected);
  })
  it('Se o fecth é chamado', async () => {
    const takeData = await fetchProducts('computer');
    expect(fetch).toHaveBeenCalled();
  });
  it('Confere o url', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computer';
    const takeData = await fetchProducts('computer');
    expect(fetch).toBeCalledWith(url);
  });
  it('Se o retorno está correto', async () => {
    const takeData = await fetchProducts('computador');
    expect(takeData).toEqual(computadorSearch);
  });
  it('retorna um erro se a função for chamada sem parametro', async () => {
    try{
    await fetchProducts();
    } catch (error){
    expect(error).toEqual(new Error('You must provide an url'))
    }
  });
});
