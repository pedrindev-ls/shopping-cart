function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  console.log(section);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const itemsValue = async () => {
  const data = await fetchProducts('computer');
  const unity = await data.results;
  const newArray = [];
  unity.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    newArray.push({
      sku,
      name,
      image,
    });
  });
  return newArray;
};

const itemsList = (group) => {
  group.forEach((element) => {
    const itemScope = createProductItemElement(element);
    const main = document.getElementsByClassName('items');
    main[0].appendChild(itemScope);
  });
};
window.onload = async () => {
  const items = await itemsValue();
  itemsList(items);
};
