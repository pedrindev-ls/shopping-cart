const cartListSpace = document.getElementsByClassName('cart__items');
const cart = document.querySelector('ol');

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
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  cart.removeChild(event.target);
  return 1;
}

async function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  cartListSpace[0].appendChild(li);
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

const itemsCart = async (value) => {
  const { id: sku, title: name, price: salePrice } = value;
  return {
    sku,
    name,
    salePrice,
  };
};

window.onload = async () => {
  const items = await itemsValue();
  itemsList(items);
  
  const btn = document.getElementsByClassName('item__add');
  const carting = (id) => fetchItem(id);
  for (let index = 0; index < btn.length; index += 1) {
    btn[index].addEventListener('click', async () => {
      const focus = items[index].sku;
      const data = await carting(focus);
      const choosed = await itemsCart(data);
      await createCartItemElement(choosed);
    });
  }
  cart.addEventListener('click', cartItemClickListener());
};
