const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Se chama setItem para o local storage', ()  => {
    const parameter = '<ol><li>Item</li></ol>';
    saveCartItems(parameter);
    expect(localStorage.setItem).toBeCalled();
  });
  it('Se setItems é chamado com os parametros "cartItems"', () => {
    const parameter = '<ol><li>Item</li></ol>';
    const saveItem = saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', parameter);
  });
});
