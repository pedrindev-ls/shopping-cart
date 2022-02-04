const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Se chama setItem para o local storage', () => {
    const saveItem = '<ol><li>Item</li></ol>'
    getSavedCartItems(saveItem);
    expect(localStorage.getItem).toBeCalled();
  });
  it('Se getItems é chamado com o parametro "cartItems"', () => {
    const saveItem = getSavedCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
