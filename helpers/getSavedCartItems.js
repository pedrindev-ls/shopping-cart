const getSavedCartItems = async () => {
  const text = localStorage.getItem('cartItems');
  return text;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
