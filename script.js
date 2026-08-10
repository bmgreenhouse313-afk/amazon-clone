const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "electronics",
    price: 1499,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "High-quality wireless Bluetooth headphones with comfortable design and clear sound."
  },

  {
    id: 2,
    name: "Smart Watch",
    category: "electronics",
    price: 2499,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description: "Modern smart watch with stylish design and useful everyday features."
  },

  {
    id: 3,
    name: "Men's Casual Shirt",
    category: "fashion",
    price: 899,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab",
    description: "Comfortable and stylish casual shirt suitable for everyday wear."
  },

  {
    id: 4,
    name: "Women's Fashion Bag",
    category: "fashion",
    price: 1299,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    description: "Elegant fashion bag with a modern design and spacious interior."
  },

  {
    id: 5,
    name: "Modern Table Lamp",
    category: "home",
    price: 799,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    description: "Modern table lamp that adds a beautiful look to your home or office."
  },

  {
    id: 6,
    name: "The Psychology of Money",
    category: "books",
    price: 399,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    description: "A popular book about money, investing and personal financial decisions."
  },

  {
    id: 7,
    name: "Skincare Beauty Set",
    category: "beauty",
    price: 999,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8",
    description: "A useful skincare beauty set for your everyday beauty routine."
  },

  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    category: "electronics",
    price: 1199,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    description: "Portable Bluetooth speaker with clear audio and convenient design."
  }
];


let cart = [];
let wishlist = [];


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(list = products) {

  const container = document.getElementById("products");

  if (!container) return;

  container.innerHTML = "";

  if (list.length === 0) {

    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:50px;">
        <h2>No products found</h2>
        <p>Try another search.</p>
      </div>
    `;

    return;
  }


  list.forEach(product => {

    const card = document.createElement("div");

    card.className = "product";

    card.innerHTML = `

      <img
        src="${product.image}"
        alt="${product.name}"
        onclick="openProductDetails(${product.id})"
      >

      <h3 onclick="openProductDetails(${product.id})">
        ${product.name}
      </h3>

      <div class="rating">
        ⭐ ${product.rating}
      </div>

      <div class="price">
        ₹${product.price.toLocaleString("en-IN")}
      </div>

      <div class="product-buttons">

        <button
          class="wishlist-button"
          onclick="toggleWishlist(${product.id})"
          title="Add to Wishlist"
        >
          ${isInWishlist(product.id) ? "❤️" : "♡"}
        </button>

        <button
          class="add-cart"
          onclick="addToCart(${product.id})"
        >
          Add to Cart
        </button>

      </div>

    `;

    container.appendChild(card);

  });

}


/* ================= PRODUCT DETAILS ================= */

function openProductDetails(id) {

  const product = products.find(
    product => product.id === id
  );

  if (!product) return;

  const modal = document.getElementById("productModal");

  const details = document.getElementById("productDetails");

  details.innerHTML = `

    <div class="product-detail">

      <div>

        <img
          src="${product.image}"
          alt="${product.name}"
        >

      </div>

      <div>

        <h2>
          ${product.name}
        </h2>

        <div class="rating">
          ⭐ ${product.rating} / 5
        </div>

        <div class="detail-price">
          ₹${product.price.toLocaleString("en-IN")}
        </div>

        <p class="detail-description">
          ${product.description}
        </p>

        <p>
          <strong>Category:</strong>
          ${product.category}
        </p>

        <br>

        <button
          class="detail-add-cart"
          onclick="addToCart(${product.id})"
        >
          🛒 Add to Cart
        </button>

        <button
          class="detail-add-cart"
          onclick="toggleWishlist(${product.id})"
          style="margin-left:10px;"
        >
          ❤️ Wishlist
        </button>

      </div>

    </div>

  `;

  modal.classList.add("show");

}


/* ================= CLOSE PRODUCT DETAILS ================= */

function closeProductDetails() {

  const modal =
    document.getElementById("productModal");

  modal.classList.remove("show");

}


/* ================= WISHLIST ================= */

function isInWishlist(id) {

  return wishlist.some(
    product => product.id === id
  );

}


function toggleWishlist(id) {

  const product = products.find(
    product => product.id === id
  );

  if (!product) return;


  if (isInWishlist(id)) {

    wishlist = wishlist.filter(
      product => product.id !== id
    );

  } else {

    wishlist.push(product);

  }


  updateWishlist();

  displayProducts();

}


function updateWishlist() {

  const count =
    document.getElementById("wishlistCount");

  if (count) {
    count.textContent = wishlist.length;
  }


  const container =
    document.getElementById("wishlistItems");

  if (!container) return;

  container.innerHTML = "";


  if (wishlist.length === 0) {

    container.innerHTML = `
      <div style="text-align:center;padding:40px;">
        <h3>Your wishlist is empty</h3>
        <p>Add products you love ❤️</p>
      </div>
    `;

    return;
  }


  wishlist.forEach(product => {

    const div =
      document.createElement("div");

    div.className = "wishlist-item";

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
          onclick="addToCart(${product.id})"
        >
          Add to Cart
        </button>

        <button
          onclick="toggleWishlist(${product.id})"
        >
          Remove
        </button>

      </div>

    `;

    container.appendChild(div);

  });

}


/* ================= OPEN WISHLIST ================= */

function openWishlist() {

  closeAllPanels();

  document
    .getElementById("wishlistPanel")
    .classList.add("open");

  document
    .getElementById("overlay")
    .classList.add("show");

}


function closeWishlist() {

  document
    .getElementById("wishlistPanel")
    .classList.remove("open");

  document
    .getElementById("overlay")
    .classList.remove("show");

}


/* ================= CART ================= */

function addToCart(id) {

  const product = products.find(
    product => product.id === id
  );

  if (!product) return;


  const existing = cart.find(
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

  alert(`${product.name} added to cart!`);

}


function updateCart() {

  const count = cart.reduce(
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


  let total = 0;


  if (cart.length === 0) {

    container.innerHTML = `
      <div style="text-align:center;padding:40px;">
        <h3>Your cart is empty</h3>
        <p>Add some products to continue shopping.</p>
      </div>
    `;

  }


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
          ${item.quantity}
        </p>

        <button
          onclick="decrease(${item.id})"
        >
          −
        </button>

        <button
          onclick="increase(${item.id})"
        >
          +
        </button>

        <button
          onclick="removeFromCart(${item.id})"
        >
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


/* ================= CART QUANTITY ================= */

function increase(id) {

  const item = cart.find(
    item => item.id === id
  );

  if (item) {

    item.quantity++;

  }

  updateCart();

}


function decrease(id) {

  const item = cart.find(
    item => item.id === id
  );

  if (!item) return;


  item.quantity--;


  if (item.quantity <= 0) {

    cart = cart.filter(
      item => item.id !== id
    );

  }


  updateCart();

}


function removeFromCart(id) {

  cart = cart.filter(
    item => item.id !== id
  );

  updateCart();

}


/* ================= OPEN CART ================= */

function openCart() {

  closeAllPanels();

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


/* ================= SEARCH ================= */

function searchProducts() {

  const input =
    document.getElementById("searchInput");

  if (!input) return;


  const query =
    input.value.toLowerCase().trim();


  const results =
    products.filter(product =>
      product.name
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


/* ================= LOGIN ================= */

function openLogin() {

  closeAllPanels();

  document
    .getElementById("loginModal")
    .classList.add("show");

}


function closeLogin() {

  document
    .getElementById("loginModal")
    .classList.remove("show");

}


function loginUser() {

  const email =
    document.getElementById("loginEmail").value;

  const password =
    document.getElementById("loginPassword").value;


  if (!email || !password) {

    alert("Please enter email and password.");

    return;

  }


  alert(
    `Welcome to ShopZone, ${email}!`
  );

  closeLogin();

}


function registerUser() {

  alert(
    "Registration will be connected to a real database in the next step."
  );

}


/* ================= CHECKOUT ================= */

function checkout() {

  if (cart.length === 0) {

    alert("Your cart is empty!");

    return;

  }


  alert(
    "Checkout page will be added in the next step."
  );

}


/* ================= SCROLL ================= */

function scrollToProducts() {

  const section =
    document.getElementById("productsTitle");

  if (section) {

    section.scrollIntoView({
      behavior: "smooth"
    });

  }

}


/* ================= CLOSE ALL ================= */

function closeAllPanels() {

  document
    .getElementById("cartPanel")
    ?.classList.remove("open");

  document
    .getElementById("wishlistPanel")
    ?.classList.remove("open");

  document
    .getElementById("overlay")
    ?.classList.remove("show");

}


/* ================= INITIALIZE ================= */

displayProducts();

updateCart();

updateWishlist();
