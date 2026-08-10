/* =====================================================
   ZENTROMAX
   COMPLETE SHOPPING WEBSITE JAVASCRIPT
===================================================== */


/* PRODUCTS */

const products = [

  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "electronics",
    price: 1499,
    rating: 4.5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 2,
    name: "Smart Watch",
    category: "electronics",
    price: 2499,
    rating: 4.3,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 3,
    name: "Men's Casual Shirt",
    category: "fashion",
    price: 899,
    rating: 4.2,
    reviews: 74,
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 4,
    name: "Women's Fashion Bag",
    category: "fashion",
    price: 1299,
    rating: 4.4,
    reviews: 113,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 5,
    name: "Modern Table Lamp",
    category: "home",
    price: 799,
    rating: 4.1,
    reviews: 52,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 6,
    name: "The Psychology of Money",
    category: "books",
    price: 399,
    rating: 4.8,
    reviews: 241,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 7,
    name: "Skincare Beauty Set",
    category: "beauty",
    price: 999,
    rating: 4.5,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=80"
  },

  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    category: "electronics",
    price: 1199,
    rating: 4.4,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80"
  }

];


let cart = [];
let wishlist = [];
let orders = [];


/* FORMAT MONEY */

function money(value) {
  return Number(value).toLocaleString("en-IN");
}


/* STARS */

function stars(rating) {

  let result = "";

  for (let i = 1; i <= 5; i++) {

    result +=
      i <= Math.round(rating)
        ? "★"
        : "☆";

  }

  return result;
}


/* DISPLAY PRODUCTS */

function displayProducts(list = products) {

  const container =
    document.getElementById("products");

  if (!container) return;

  container.innerHTML = "";


  if (list.length === 0) {

    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔎</div>
        <h3>No products found</h3>
        <p>Try another search or category.</p>
      </div>
    `;

    return;
  }


  list.forEach(product => {

    const wished =
      wishlist.some(
        item => item.id === product.id
      );


    const card =
      document.createElement("article");

    card.className = "product";


    card.innerHTML = `

      <div class="product-top">

        <span class="product-category">
          ${product.category}
        </span>

        <button
          class="wishlist-btn"
          onclick="toggleWishlist(${product.id}); event.stopPropagation();">

          ${wished ? "❤️" : "♡"}

        </button>

      </div>


      <div
        class="product-image"
        onclick="openProductDetails(${product.id})">

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy">

      </div>


      <div
        class="product-info"
        onclick="openProductDetails(${product.id})">

        <h3>${product.name}</h3>

        <div class="rating">

          <span class="stars">
            ${stars(product.rating)}
          </span>

          <span class="rating-number">
            ${product.rating}
            (${product.reviews})
          </span>

        </div>

        <div class="price">
          ₹${money(product.price)}
        </div>

      </div>


      <button
        class="add-cart"
        onclick="addToCart(${product.id})">

        🛒 Add to Cart

      </button>

    `;


    container.appendChild(card);

  });

}


/* SEARCH */

function searchProducts() {

  const input =
    document.getElementById("searchInput");

  const query =
    input.value.trim().toLowerCase();


  if (!query) {

    displayProducts(products);
    return;

  }


  const results =
    products.filter(product =>

      product.name.toLowerCase().includes(query) ||

      product.category.toLowerCase().includes(query)

    );


  displayProducts(results);

}


/* CATEGORY */

function filterCategory(category) {

  if (category === "all") {

    displayProducts(products);
    return;

  }


  displayProducts(
    products.filter(
      product =>
        product.category === category
    )
  );

}


/* ADD CART */

function addToCart(id) {

  const product =
    products.find(
      item => item.id === id
    );

  if (!product) return;


  const existing =
    cart.find(
      item => item.id === id
    );


  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }


  updateCart();

  openCart();

}


/* UPDATE CART */

function updateCart() {

  const count =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  document.getElementById(
    "cartCount"
  ).textContent = count;


  const container =
    document.getElementById(
      "cartItems"
    );


  container.innerHTML = "";


  if (cart.length === 0) {

    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add products to your cart.</p>
      </div>
    `;

  }


  let total = 0;


  cart.forEach(item => {

    total +=
      item.price * item.quantity;


    const row =
      document.createElement("div");

    row.className = "cart-item";


    row.innerHTML = `

      <img
        src="${item.image}"
        alt="${item.name}">

      <div>

        <strong>
          ${item.name}
        </strong>

        <p>
          ₹${money(item.price)}
        </p>

        <p>
          Quantity:
          <b>${item.quantity}</b>
        </p>

        <button
          onclick="decrease(${item.id})">
          −
        </button>

        <button
          onclick="increase(${item.id})">
          +
        </button>

        <button
          onclick="removeFromCart(${item.id})">
          Remove
        </button>

      </div>
    `;


    container.appendChild(row);

  });


  document.getElementById(
    "cartTotal"
  ).textContent = money(total);

}


/* QUANTITY */

function increase(id) {

  const item =
    cart.find(
      product => product.id === id
    );

  if (item) item.quantity++;

  updateCart();

}


function decrease(id) {

  const item =
    cart.find(
      product => product.id === id
    );

  if (!item) return;

  item.quantity--;


  if (item.quantity <= 0) {

    removeFromCart(id);
    return;

  }


  updateCart();

}


function removeFromCart(id) {

  cart =
    cart.filter(
      item => item.id !== id
    );

  updateCart();

}


/* CART OPEN / CLOSE */

function openCart() {

  document
    .getElementById("cartPanel")
    .classList.add("open");

  document
    .getElementById("overlay")
    .classList.add("show");

}


function closeCart() {

  document
    .getElementById("cartPanel")
    .classList.remove("open");

  document
    .getElementById("overlay")
    .classList.remove("show");

}


/* LOGIN */

function openLogin() {

  document
    .getElementById("loginModal")
    .classList.add("show");

}


function closeLogin() {

  document
    .getElementById("loginModal")
    .classList.remove("show");

}


function login(event) {

  event.preventDefault();

  alert("Welcome to Zentromax! Login successful.");

  closeLogin();

}


/* ORDERS */

function openOrders() {

  document
    .getElementById("ordersModal")
    .classList.add("show");

  displayOrders();

}


function closeOrders() {

  document
    .getElementById("ordersModal")
    .classList.remove("show");

}


function displayOrders() {

  const box =
    document.getElementById(
      "ordersContent"
    );


  if (orders.length === 0) {

    box.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📦</div>
        <h3>No orders yet</h3>
        <p>Your orders will appear here.</p>

        <button
          class="primary-btn"
          onclick="
            closeOrders();
            scrollToProducts();
          ">
          Start Shopping
        </button>
      </div>
    `;

    return;

  }


  box.innerHTML = "";


  orders.forEach(order => {

    const item =
      document.createElement("div");

    item.className = "cart-item";


    item.innerHTML = `

      <div>

        <strong>
          Order #${order.id}
        </strong>

        <p>
          Date: ${order.date}
        </p>

        <p>
          Total: ₹${money(order.total)}
        </p>

        <b>
          Status: ${order.status}
        </b>

      </div>

    `;


    box.appendChild(item);

  });

}


/* WISHLIST */

function toggleWishlist(id) {

  const product =
    products.find(
      item => item.id === id
    );

  if (!product) return;


  const exists =
    wishlist.some(
      item => item.id === id
    );


  if (exists) {

    wishlist =
      wishlist.filter(
        item => item.id !== id
      );

  } else {

    wishlist.push(product);

  }


  updateWishlist();

  displayProducts();

}


function updateWishlist() {

  document.getElementById(
    "wishlistCount"
  ).textContent =
    wishlist.length;

}


function openWishlist() {

  document
    .getElementById("wishlistModal")
    .classList.add("show");

  displayWishlist();

}


function closeWishlist() {

  document
    .getElementById("wishlistModal")
    .classList.remove("show");

}


function displayWishlist() {

  const box =
    document.getElementById(
      "wishlistItems"
    );


  if (wishlist.length === 0) {

    box.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">❤️</div>
        <h3>Your wishlist is empty</h3>
        <p>Save products you love here.</p>
      </div>
    `;

    return;

  }


  box.innerHTML = "";


  wishlist.forEach(product => {

    const row =
      document.createElement("div");

    row.className = "cart-item";


    row.innerHTML = `

      <img
        src="${product.image}"
        alt="${product.name}">

      <div>

        <strong>
          ${product.name}
        </strong>

        <p>
          ₹${money(product.price)}
        </p>

        <button
          onclick="addToCart(${product.id})">
          Add to Cart
        </button>

        <button
          onclick="toggleWishlist(${product.id})">
          Remove
        </button>

      </div>

    `;


    box.appendChild(row);

  });

}


/* PRODUCT DETAILS */

function openProductDetails(id) {

  const product =
    products.find(
      item => item.id === id
    );

  if (!product) return;


  const content =
    document.getElementById(
      "productDetailsContent"
    );


  content.innerHTML = `

    <div class="product-details-grid">

      <div class="details-image">

        <img
          src="${product.image}"
          alt="${product.name}">

      </div>


      <div class="details-info">

        <span class="product-category">
          ${product.category}
        </span>

        <h2>
          ${product.name}
        </h2>


        <div class="details-rating">

          <span class="stars">
            ${stars(product.rating)}
          </span>

          <strong>
            ${product.rating}/5
          </strong>

          <span>
            ${product.reviews} reviews
          </span>

        </div>


        <div class="details-price">
          ₹${money(product.price)}
        </div>


        <p class="details-description">

          Premium quality ${product.name}.
          Shop confidently with Zentromax.
          Secure checkout and reliable delivery
          available.

        </p>


        <div class="details-actions">

          <button
            class="primary-btn"
            onclick="
              addToCart(${product.id});
              closeProductDetails();
            ">

            🛒 Add to Cart

          </button>

          <button
            class="secondary-btn"
            onclick="
              toggleWishlist(${product.id});
            ">

            ❤️ Wishlist

          </button>

        </div>

      </div>

    </div>

  `;


  document
    .getElementById("productModal")
    .classList.add("show");

}


function closeProductDetails() {

  document
    .getElementById("productModal")
    .classList.remove("show");

}


/* CHECKOUT */

function checkout() {

  if (cart.length === 0) {

    alert(
      "Your cart is empty!"
    );

    return;

  }


  closeCart();


  document
    .getElementById("checkoutModal")
    .classList.add("show");

}


function closeCheckout() {

  document
    .getElementById("checkoutModal")
    .classList.remove("show");

}


/* PLACE ORDER */

function placeOrder(event) {

  event.preventDefault();


  const total =
    cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );


  const order = {

    id:
      "ZM" +
      Math.floor(
        100000 +
        Math.random() * 900000
      ),

    date:
      new Date().toLocaleDateString("en-IN"),

    total: total,

    status: "Confirmed"

  };


  orders.unshift(order);


  cart = [];

  updateCart();

  closeCheckout();


  alert(
    "🎉 Order placed successfully!"
  );


  openOrders();

}


/* HOME */

function goHome() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* SCROLL */

function scrollToProducts() {

  document
    .getElementById("shop")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* CLOSE EVERYTHING */

function closeAllPanels() {

  closeCart();
  closeLogin();
  closeOrders();
  closeWishlist();
  closeProductDetails();
  closeCheckout();

}


/* ESCAPE */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {
      closeAllPanels();
    }

  }
);


/* START */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    displayProducts();

    updateCart();

    updateWishlist();

  }
);
