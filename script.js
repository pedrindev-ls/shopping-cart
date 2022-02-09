const cartListSpace = document.getElementsByClassName('cart__items');
const cart = document.querySelector('ol');
const btn = document.getElementsByClassName('item__add');
const listed = document.getElementsByTagName('li');
const clearBtn = document.getElementsByClassName('empty-cart');
let value = +localStorage.getItem('price');
const placeToPrice = document.getElementsByClassName('total-price');
const totalPrice = placeToPrice[0];

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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

const savePrice = () => {
  console.log(totalPrice.innerText);
  localStorage.setItem('price', totalPrice.innerText);
};
  
const subPrice = async (price) => {
  value -= price;
  value = Math.round(value * 100);
  value /= 100;
  totalPrice.innerText = value;
  savePrice();
};
  
function cartItemClickListener(event) {
  const removedItem = event.target.innerText;
  const takePrice = removedItem.split('$');
  const takedPrice = +takePrice[1];
  subPrice(takedPrice);
  cart.removeChild(event.target);
  saveCartItems(cart.innerHTML);
}

async function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  cartListSpace[0].appendChild(li);
  saveCartItems(cart.innerHTML);
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

const itemsCart = async (things) => {
  const { id: sku, title: name, price: salePrice } = things;
  return {
    sku,
    name,
    salePrice,
  };
};

const sumPrice = async (info) => {
  value += (info.salePrice);
  value = Math.round(value * 100);
  value /= 100;
  totalPrice.innerText = value;
  savePrice();
};


const requestPrice = () => {
  const savedPrice = localStorage.getItem('price');
  totalPrice.innerText = savedPrice;
};

const addCart = async () => {
  const items = await itemsValue();
  const carting = (id) => fetchItem(id);
  for (let index = 0; index < btn.length; index += 1) {
    btn[index].addEventListener('click', async () => {
      const focus = items[index].sku;
      const data = await carting(focus);
      const choosed = await itemsCart(data);
      await sumPrice(choosed);
      await createCartItemElement(choosed);
    });
  }
};

const addListener = (items) => {
  for (let index = 0; index < items.length; index += 1) {
    items[index].addEventListener('click', cartItemClickListener);
  }
};

clearBtn[0].addEventListener('click', () => {
  for (let index = (listed.length - 1); index >= 0; index -= 1) {
    cart.removeChild(listed[index]);
    saveCartItems(cart.innerHTML);
  }
});

window.onload = async () => {
  const items = await itemsValue();
  itemsList(items);
  addCart();
  const cartSaved = await getSavedCartItems();
  cart.innerHTML = cartSaved;
  addListener(listed);
  requestPrice();
};
