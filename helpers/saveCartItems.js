const newArr = [];

const saveCartItems = (value) => {
  localStorage.setItem('cartItems', value);
  console.log(value);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
