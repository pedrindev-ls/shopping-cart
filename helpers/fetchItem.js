const fetchItem = async (itemID) => {
  try {
  const url = `https://api.mercadolibre.com/items/${itemID}`;
  const info = await fetch(url);
  const data = await info.json();
  return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
