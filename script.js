const products = [

  {
    id 1,
    name Wireless Bluetooth Headphones,
    category electronics,
    price 1499,
    rating 4.5,
    image httpsimages.unsplash.comphoto-1505740420928-5e560c06d30e
  },

  {
    id 2,
    name Smart Watch,
    category electronics,
    price 2499,
    rating 4.3,
    image httpsimages.unsplash.comphoto-1523275335684-37898b6baf30
  },

  {
    id 3,
    name Men's Casual Shirt,
    category fashion,
    price 899,
    rating 4.2,
    image httpsimages.unsplash.comphoto-1603252110481-7ba873bf42ab
  },

  {
    id 4,
    name Women's Fashion Bag,
    category fashion,
    price 1299,
    rating 4.4,
    image httpsimages.unsplash.comphoto-1584917865442-de89df76afd3
  },

  {
    id 5,
    name Modern Table Lamp,
    category home,
    price 799,
    rating 4.1,
    image httpsimages.unsplash.comphoto-1507473885765-e6ed057f782c
  },

  {
    id 6,
    name The Psychology of Money,
    category books,
    price 399,
    rating 4.8,
    image httpsimages.unsplash.comphoto-1544947950-fa07a98d237f
  },

  {
    id 7,
    name Skincare Beauty Set,
    category beauty,
    price 999,
    rating 4.5,
    image httpsimages.unsplash.comphoto-1556229010-6c3f2c9ca5f8
  },

  {
    id 8,
    name Portable Bluetooth Speaker,
    category electronics,
    price 1199,
    rating 4.4,
    image httpsimages.unsplash.comphoto-1608043152269-423dbba4e7e1
  }

];


let cart = [];


 Display Products 

function displayProducts(list = products) {

  const container = document.getElementById(products);

  container.innerHTML = ;

  list.forEach(product = {

    const card = document.createElement(div);

    card.className = product;

    card.innerHTML = `

      img src=${product.image} alt=${product.name}

      h3${product.name}h3

      div class=rating
        ⭐ ${product.rating}
      div

      div class=price
        ₹${product.price.toLocaleString(en-IN)}
      div

      button
        class=add-cart
        onclick=addToCart(${product.id})
      
        Add to Cart
      button

    `;

    container.appendChild(card);

  });

}


 Add Cart 

function addToCart(id) {

  const product = products.find(p = p.id === id);

  const existing = cart.find(item = item.id === id);

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      ...product,
      quantity 1
    });

  }

  updateCart();

}


 Update Cart 

function updateCart() {

  const count = cart.reduce(
    (total, item) = total + item.quantity,
    0
  );

  document.getElementById(cartCount).textContent = count;

  const container = document.getElementById(cartItems);

  container.innerHTML = ;

  let total = 0;

  cart.forEach(item = {

    total += item.price  item.quantity;

    const div = document.createElement(div);

    div.className = cart-item;

    div.innerHTML = `

      img src=${item.image}

      div

        strong${item.name}strong

        p₹${item.price.toLocaleString(en-IN)}p

        p
          Quantity ${item.quantity}
        p

        button onclick=decrease(${item.id})
          −
        button

        button onclick=increase(${item.id})
          +
        button

        button onclick=removeFromCart(${item.id})
          Remove
        button

      div

    `;

    container.appendChild(div);

  });

  document.getElementById(cartTotal).textContent =
    total.toLocaleString(en-IN);

}


 Increase 

function increase(id) {

  const item = cart.find(item = item.id === id);

  if (item) {
    item.quantity++;
  }

  updateCart();

}


 Decrease 

function decrease(id) {

  const item = cart.find(item = item.id === id);

  if (!item) return;

  item.quantity--;

  if (item.quantity = 0) {

    cart = cart.filter(item = item.id !== id);

  }

  updateCart();

}


 Remove 

function removeFromCart(id) {

  cart = cart.filter(item = item.id !== id);

  updateCart();

}


 Search 

function searchProducts() {

  const query =
    document
      .getElementById(searchInput)
      .value
      .toLowerCase();

  const results = products.filter(product =
    product.name.toLowerCase().includes(query)
  );

  displayProducts(results);

}


 Category 

function filterCategory(category) {

  if (category === all) {

    displayProducts(products);

    return;

  }

  const filtered = products.filter(
    product = product.category === category
  );

  displayProducts(filtered);

}


 Cart Open 

function openCart() {

  document
    .getElementById(cartPanel)
    .classList.add(open);

  document
    .getElementById(overlay)
    .classList.add(show);

}


 Cart Close 

function closeCart() {

  document
    .getElementById(cartPanel)
    .classList.remove(open);

  document
    .getElementById(overlay)
    .classList.remove(show);

}


 Checkout 

function checkout() {

  if (cart.length === 0) {

    alert(Your cart is empty!);

    return;

  }

  alert(
    Checkout page will be connected in the next step.
  );

}


 Scroll 

function scrollToProducts() {

  document
    .getElementById(productsTitle)
    .scrollIntoView({
      behavior smooth
    });

}


 Initial 

displayProducts();
updateCart();
<script src="script.js"></script>
</body>
</html>
