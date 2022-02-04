require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Se realmente é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Se o fecth é chamado', async () => {
    const takeData = await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Se o Endpoint está correto', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    const takeData = await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(url);
  });
  it('Se o retorno está correto', async () => {
    const takeData = await fetchItem('MLB1615760527');
    expect(takeData).toEqual(item)
  });
  it('Se retorna erro ao ser chamada sem parametro', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('mensagem esperada aqui'))
    }
  });
});
