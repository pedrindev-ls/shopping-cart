const fetchItem = async (itemID) => {
  const url = `https://api.mercadolibre.com/items/${itemID}`;
  const info = await fetch(url);
  const data = await info.json();
  const { id: sku, title: name, price: salePrice } = data;
  const newObj = {
    sku,
    name,
    salePrice,
  };
  console.log(newObj);
  return newObj;
};

// fetchItem('MLB1937079157');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
