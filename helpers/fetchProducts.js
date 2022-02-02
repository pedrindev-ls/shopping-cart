const fetchProducts = async (product) => {
  // if (product === undefined) {
  //   throw new Error('You must provide an url');
  // }
  try {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const info = await fetch(url);
  const data = await info.json();
  return data;
  // const foundData = data.results;
  } catch (error) {
    return error;
  }
};

// fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
