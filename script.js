/* =====================================================
   ZENTROMAX - COMPLETE JAVASCRIPT
===================================================== */


/* ================= PRODUCTS ================= */

const products = [

  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "electronics",
    price: 1499,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  },

  {
    id: 2,
    name: "Smart Watch",
    category: "electronics",
    price: 2499,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
  },

  {
    id: 3,
    name: "Men's Casual Shirt",
    category: "fashion",
    price: 899,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=600&q=80"
  },

  {
    id: 4,
    name: "Women's Fashion Bag",
    category: "fashion",
    price: 1299,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
  },

  {
    id: 5,
    name: "Modern Table Lamp",
    category: "home",
    price: 799,
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
  },

  {
    id: 6,
    name: "The Psychology of Money",
    category: "books",
    price: 399,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80"
  },

  {
    id: 7,
    name: "Skincare Beauty Set",
    category: "beauty",
    price: 999,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=600&q=80"
  },

  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    category: "electronics",
    price: 1199,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80"
  }

];


/* ================= DATA ================= */

let cart = [];

let wishlist = [];

let orders = [];


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(list = products) {

  const container = document.getElementById("products");

  if (!container) return;

  container.innerHTML = "";

  if (list.length === 0) {

    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔎</div>
        <h3>No products found</h3>
        <p>Try searching for another product.</p>
      </div>
    `;

    return;
  }


  list.forEach(product => {

    const card = document.createElement("div");

    card.className = "product";


    const isWishlisted =
      wishlist.some(item => item.id === product.id);


    card.innerHTML = `

      <div style="
        display:flex;
        justify-content:flex-end;
        margin-bottom:5px;
      ">

        <button
          onclick="toggleWishlist(${product.id})"
          style="
            border:none;
            background:none;
            cursor:pointer;
            font-size:22px;
          "
          title="Wishlist">

          ${isWishlisted ? "❤️" : "♡"}

        </button>

      </div>


      <img
        src="${product.image}"
        alt="${product.name}"
      >


      <h3>
        ${product.name}
      </h3>


      <div class="rating">
        ⭐ ${product.rating}
      </div>


      <div class="price">
        ₹${product.price.toLocaleString("en-IN")}
      </div>


      <button
        class="add-cart"
        onclick="addToCart(${product.id})">

        Add to Cart

      </button>

    `;


    container.appendChild(card);

  });

}


/* ================= CART ================= */

function addToCart(id) {

  const product =
    products.find(product => product.id === id);


  if (!product) return;


  const existing =
    cart.find(item => item.id === id);


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


/* ================= UPDATE CART ================= */

function updateCart() {

  const count =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  const cartCount =
    document.getElementById("cartCount");


  if (cartCount) {
    cartCount.textContent = count;
  }


  const container =
    document.getElementById("cartItems");


  if (!container) return;


  container.innerHTML = "";


  if (cart.length === 0) {

    container.innerHTML = `

      <div class="empty-state">

        <div class="empty-icon">
          🛒
        </div>

        <h3>Your cart is empty</h3>

        <p>
          Add some products to your cart.
        </p>

        <button
          class="primary-button"
          onclick="closeCart(); scrollToProducts()">

          Start Shopping

        </button>

      </div>

    `;

  }


  let total = 0;


  cart.forEach(item => {

    total +=
      item.price * item.quantity;


    const div =
      document.createElement("div");


    div.className = "cart-item";


    div.innerHTML = `

      <img
        src="${item.image}"
        alt="${item.name}"
      >


      <div>

        <strong>
          ${item.name}
        </strong>


        <p>
          ₹${item.price.toLocaleString("en-IN")}
        </p>


        <p>
          Quantity:
          <strong>${item.quantity}</strong>
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


    container.appendChild(div);

  });


  const totalElement =
    document.getElementById("cartTotal");


  if (totalElement) {

    totalElement.textContent =
      total.toLocaleString("en-IN");

  }

}


/* ================= INCREASE ================= */

function increase(id) {

  const item =
    cart.find(item => item.id === id);


  if (item) {

    item.quantity++;

  }


  updateCart();

}


/* ================= DECREASE ================= */

function decrease(id) {

  const item =
    cart.find(item => item.id === id);


  if (!item) return;


  item.quantity--;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        item => item.id !== id
      );

  }


  updateCart();

}


/* ================= REMOVE ================= */

function removeFromCart(id) {

  cart =
    cart.filter(
      item => item.id !== id
    );


  updateCart();

}


/* ================= SEARCH ================= */

function searchProducts() {

  const input =
    document.getElementById("searchInput");


  if (!input) return;


  const query =
    input.value
      .trim()
      .toLowerCase();


  if (query === "") {

    displayProducts(products);

    return;

  }


  const results =
    products.filter(product =>

      product.name
        .toLowerCase()
        .includes(query)

      ||

      product.category
        .toLowerCase()
        .includes(query)

    );


  displayProducts(results);

}


/* ================= CATEGORY ================= */

function filterCategory(category) {

  if (category === "all") {

    displayProducts(products);

    return;

  }


  const filtered =
    products.filter(
      product =>
        product.category === category
    );


  displayProducts(filtered);

}


/* ================= CART OPEN ================= */

function openCart() {

  const panel =
    document.getElementById("cartPanel");


  const overlay =
    document.getElementById("overlay");


  if (panel) {

    panel.classList.add("open");

  }


  if (overlay) {

    overlay.classList.add("show");

  }

}


/* ================= CART CLOSE ================= */

function closeCart() {

  const panel =
    document.getElementById("cartPanel");


  const overlay =
    document.getElementById("overlay");


  if (panel) {

    panel.classList.remove("open");

  }


  if (overlay) {

    overlay.classList.remove("show");

  }

}


/* ================= LOGIN ================= */

function openLogin() {

  const modal =
    document.getElementById("loginModal");


  if (modal) {

    modal.classList.add("show");

  }

}


function closeLogin() {

  const modal =
    document.getElementById("loginModal");


  if (modal) {

    modal.classList.remove("show");

  }

}


/* ================= LOGIN SUBMIT ================= */

function login(event) {

  event.preventDefault();


  const email =
    document.getElementById("loginEmail").value;


  if (!email) return;


  alert(
    "Welcome to Zentromax! Login successful."
  );


  closeLogin();

}


/* ================= ORDERS ================= */

function openOrders() {

  const modal =
    document.getElementById("ordersModal");


  if (modal) {

    modal.classList.add("show");

  }


  displayOrders();

}


function closeOrders() {

  const modal =
    document.getElementById("ordersModal");


  if (modal) {

    modal.classList.remove("show");

  }

}


/* ================= DISPLAY ORDERS ================= */

function displayOrders() {

  const container =
    document.getElementById("ordersContent");


  if (!container) return;


  if (orders.length === 0) {

    container.innerHTML = `

      <div class="empty-state">

        <div class="empty-icon">
          📦
        </div>

        <h3>No orders yet</h3>

        <p>
          Your orders will appear here after
          you purchase a product.
        </p>

        <button
          class="primary-button"
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


  container.innerHTML = "";


  orders.forEach(order => {

    const div =
      document.createElement("div");


    div.style.padding = "15px";
    div.style.borderBottom =
      "1px solid #e2e8f0";


    div.innerHTML = `

      <strong>
        Order #${order.id}
      </strong>

      <p>
        ${order.date}
      </p>

      <p>
        Total:
        ₹${order.total.toLocaleString("en-IN")}
      </p>

      <strong>
        Status: ${order.status}
      </strong>

    `;


    container.appendChild(div);

  });

}


/* ================= WISHLIST ================= */

function toggleWishlist(id) {

  const product =
    products.find(
      product => product.id === id
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


  updateWishlistCount();

  displayWishlist();

  displayProducts(
    document
      .getElementById("searchInput")
      ?.value
      ? products
      : products
  );

}


function updateWishlistCount() {

  const count =
    document.getElementById(
      "wishlistCount"
    );


  if (count) {

    count.textContent =
      wishlist.length;

  }

}


/* ================= OPEN WISHLIST ================= */

function openWishlist() {

  const modal =
    document.getElementById(
      "wishlistModal"
    );


  if (modal) {

    modal.classList.add("show");

  }


  displayWishlist();

}


function closeWishlist() {

  const modal =
    document.getElementById(
      "wishlistModal"
    );


  if (modal) {

    modal.classList.remove("show");

  }

}


/* ================= DISPLAY WISHLIST ================= */

function displayWishlist() {

  const container =
    document.getElementById(
      "wishlistItems"
    );


  if (!container) return;


  if (wishlist.length === 0) {

    container.innerHTML = `

      <div class="empty-state">

        <div class="empty-icon">
          ❤️
        </div>

        <h3>
          Your wishlist is empty
        </h3>

        <p>
          Save products you love and find
          them here.
        </p>

      </div>

    `;

    return;

  }


  container.innerHTML = "";


  wishlist.forEach(product => {

    const div =
      document.createElement("div");


    div.className = "cart-item";


    div.innerHTML = `

      <img
        src="${product.image}"
        alt="${product.name}"
      >


      <div>

        <strong>
          ${product.name}
        </strong>

        <p>
          ₹${product.price.toLocaleString("en-IN")}
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


    container.appendChild(div);

  });

}


/* ================= CHECKOUT ================= */

function checkout() {

  if (cart.length === 0) {

    alert(
      "Your cart is empty. Add a product first."
    );

    return;

  }


  closeCart();


  const modal =
    document.getElementById(
      "checkoutModal"
    );


  if (modal) {

    modal.classList.add("show");

  }

}


function closeCheckout() {

  const modal =
    document.getElementById(
      "checkoutModal"
    );


  if (modal) {

    modal.classList.remove("show");

  }

}


/* ================= PLACE ORDER ================= */

function placeOrder(event) {

  event.preventDefault();


  let total = 0;


  cart.forEach(item => {

    total +=
      item.price * item.quantity;

  });


  const order = {

    id:
      "ZM" +
      Math.floor(
        100000 +
        Math.random() * 900000
      ),

    date:
      new Date().toLocaleDateString(
        "en-IN"
      ),

    total: total,

    status: "Confirmed"

  };


  orders.push(order);


  cart = [];


  updateCart();


  closeCheckout();


  alert(
    "🎉 Order placed successfully!"
  );


  openOrders();

}


/* ================= CLOSE ALL ================= */

function closeAllPanels() {

  closeCart();

  closeLogin();

  closeOrders();

  closeWishlist();

  closeCheckout();

}


/* ================= SCROLL ================= */

function scrollToProducts() {

  const section =
    document.getElementById(
      "productsTitle"
    );


  if (!section) return;


  section.scrollIntoView({
    behavior: "smooth"
  });

}


/* ================= HOME ================= */

function goHome() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  displayProducts(products);

}


/* ================= ESC KEY ================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      closeAllPanels();

    }

  }
);


/* ================= INITIAL LOAD ================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    displayProducts();

    updateCart();

    updateWishlistCount();

    displayWishlist();

  }
);
